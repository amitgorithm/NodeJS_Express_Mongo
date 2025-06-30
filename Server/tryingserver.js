const http = require('http');
const fs = require('fs');
const os = require('os');

const selfServer = http.createServer((req,res)=> {
    const userLog = `${Date.now()}: ${req.url}: New Request Logged In`

  fs.appendFile("userLogs.txt",userLog, (err,data)=> {
  })
  console.log((req.url) + " Server Hit ")
  if ((req.url)==='/') {
    res.end("HomePage");
    fs.appendFile("userLogs.txt","The HomePage was hit ",(err,data)=>{});
  } else if((req.url)==='/about') {
    res.end("About Page ")
  } else if((req.url)==='/contact-us'){
    res.end("Here is our contact ")
    console.log(50);
  };
})

selfServer.listen(5007,()=> {});

