const BinReader = require('./binreader');

const reader = new BinReader({
    filename: 'test.txt',
    bufferSize: 3
});

function printSequence(sequence) {
    console.log(`Sequence is: '${String.fromCharCode.apply(null, sequence)}'`);
}

let testSequence;
reader.seek(0);
testSequence = [reader.nextByte(), reader.nextByte()];
printSequence(testSequence);

reader.seek(1);
testSequence = [reader.nextByte()];
printSequence(testSequence);

reader.seek(0);
testSequence = [reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte()];
printSequence(testSequence);

reader.seek(8);
testSequence = [reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte()];
printSequence(testSequence);

reader.seek(10);
testSequence = [reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte()];
printSequence(testSequence);

reader.seek(0);
testSequence = [reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte()];
printSequence(testSequence);


reader.seek(100);
testSequence = [reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte(), reader.nextByte()];
printSequence(testSequence);
