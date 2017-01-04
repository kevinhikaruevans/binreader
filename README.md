# binaryreader

A basic buffered binary reader for Node.js.


# Basic Examples

```js
const BinaryReader = require('BinaryReader');

const reader = new BinaryReader({
  filename: 'hello.dat'
});

reader.seek(512);
const x = reader.nextInt();
```
