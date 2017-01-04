# binreader

A basic buffered binary reader for Node.js.


# Basic Examples

```js
const BinReader = require('binreader');

const reader = new BinReader({
  filename: 'hello.dat'
});

reader.seek(512);
const x = reader.nextInt();
```

# API

* `constructor(options)`: `options` contains properties: `filename`, `byteOrder` (optional), `bufferSize` (optional)

* Number: `length`: returns the length of the file

* Boolean: `canRead`: returns true if the stream is not at the end

* Number: `nextLong()`: reads signed 64 bit number. note that the max precision in javascript is only 53 bits!

* Number: `nextULong()`: reads an unsigned 64 bit number. note that the max precision in javascript is only 53 bits!

* Number: `nextInt()`: reads a 32 bit signed number

* Number: `nextUInt()`: reads a 32 bit unsigned number

* Number: `nextShort()`: reads a 16 bit signed number

* Number: `nextUShort()`: reads a 16 bit unsigned number

* Number: `nextByte()`: reads a 8 bit unsigned number

* Number: `nextSByte()`: reads a 8 bit signed number
