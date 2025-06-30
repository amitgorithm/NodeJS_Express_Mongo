const fs = require('fs');

// Sync...
// fs.writeFileSync('./test.txt', 'Hey There File System');

// Async // requires a callback function as paramater/argument.
// fs.writeFile('./test.txt',"Hello There Async",(err) => {} );

// const result = fs.readFileSync("./contacts.txt","utf-8");
// console.log(result);

fs.readFile("./contacts.txt", "utf-8", (err,result)=> {
  if(err){
    console.log("Error", err);
  } else {
    console.log(result);
  }
})

// append 
// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt", `${Date.now()}  Hey There\n`);

// fs.cpSync('./test.txt', "./copy.txt"); // will make a copy

// fs.unlinkSync("./copy.txt"); // will delete copy.txt

console.log(fs.statSync("./test.txt").isFile());
fs.mkdirSync('my-docss/a/b', {recursive: true});



