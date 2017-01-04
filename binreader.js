const fs = require('graceful-fs');

class BinReader {
    constructor(options) {
        if (!options.filename) {
            throw 'invalid filename';
        }
        this.options = Object.assign({
            bufferSize: 1024,
            byteOrder: 'LE'
        }, options);

        this.position = 0;
        this.bufferPosition = 0;
        this.currentBufferSize = 0;
        this.stats = fs.statSync(this.options.filename);
        this.fileDescriptor = fs.openSync(this.options.filename, 'r');
        this.buffer = Buffer.alloc(this.options.bufferSize);
    }
    get length() {
        return this.stats.size;
    }
    get canRead() {
        return this.position < this.length;
    }
    seek(position) {
        this.position = position;
        return this.fillBuffer();
    }
    fillBuffer() {
        const position = this.bufferPosition = this.position;
        this.currentBufferSize = fs.readSync(
            this.fileDescriptor,
            this.buffer,
            0,
            this.buffer.length,
            position
        );

        return this.currentBufferSize > 0;
    }

    readLE(size, signed) {
        if (!this.canRead) {
            return -1;
        }
        if (size > 8 || size < 1) {
            throw 'invalid params';
        }
        if (!this.currentBufferSize || ((this.position - this.bufferPosition) + size) > this.buffer.length) {
            this.fillBuffer();
        }

        const bufferOffset = this.position - this.bufferPosition;
        const bytesCanRead = this.buffer.length - bufferOffset;

        if (bytesCanRead < size) {
            const tmpBuffer = Buffer.alloc(size);
            let bytesRead = this.buffer.copy(tmpBuffer, 0);
            this.position += bytesRead;
            while(bytesRead < size) {
                this.fillBuffer();
                const bytesCopied = this.buffer.copy(tmpBuffer, bytesRead, 0, size - bytesRead);
                bytesRead += bytesCopied;
                this.position += bytesCopied;
            }

            return this.readFromBuffer(tmpBuffer, 0, size, signed);
        } else {
            // can read full
            this.position += size;
            return this.readFromBuffer(this.buffer, bufferOffset, size, signed);
        }
    }
    readFromBuffer(buffer, offset, size, signed) {
        if (signed) {
            return this.options.byteOrder === 'LE' ? buffer.readIntLE(offset, size, true) : buffer.readIntBE(offset, size, true);
        }
        return this.options.byteOrder === 'LE' ? buffer.readUIntLE(offset, size, true) : buffer.readUIntBE(offset, size, true);
    }
    nextLong()   { return this.readLE(8, true);  }
    nextULong()  { return this.readLE(8, false); }
    nextInt()    { return this.readLE(4, true);  }
    nextUInt()   { return this.readLE(4, false); }
    nextShort()  { return this.readLE(2, true);  }
    nextUShort() { return this.readLE(2, false); }
    nextByte()   { return this.readLE(1, false); }
    nextSByte()  { return this.readLE(1, true);  }
}

module.exports = BinReader;
