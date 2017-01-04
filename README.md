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
