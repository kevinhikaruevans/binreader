const BinReader = require('./binreader');

const reader = new BinReader({
    filename: 'test.txt',
    bufferSize: 1
});

reader.seek(1);
console.log(String.fromCharCode(reader.nextByte()));
console.log(String.fromCharCode(reader.nextByte()));
console.log(String.fromCharCode(reader.nextByte()));
console.log(String.fromCharCode(reader.nextByte()));
reader.seek(0);
console.log(String.fromCharCode(reader.nextByte()));
console.log(String.fromCharCode(reader.nextByte()));
console.log(String.fromCharCode(reader.nextByte()));
