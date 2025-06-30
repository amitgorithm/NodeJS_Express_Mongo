const fs = require('fs');
const os = require('os');

// to know the cores of the CPU
console.log(os.cpus().length);


console.log(1);

// Non Blocking // Async
fs.readFile("contacts.txt", "utf-8",(err,result)=> {
  if(err){
    console.log("Error is ", err);
  } else{
    console.log(result);
  }
});


console.log(2);
console.log(3);

// default thread pool size = 4
// Max? depends on core of CPU
// 8core cpu - 8 threads

