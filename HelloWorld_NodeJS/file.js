const fs = require('fs');

// Sync...
// fs.writeFileSync('./test.txt', 'Hey There File System');

// Async // requires a callback function as paramater/argument.
fs.writeFile('./test.txt',"Hello There Async",(err) => {} );