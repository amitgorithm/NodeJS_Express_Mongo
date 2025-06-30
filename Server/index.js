const http = require("http");
const fs = require('fs');

// we are creating alog for the users who hit the server/port
// we created a variable 'log'that stores the date.now 
//then we fs.appendFile withthe data in log variable,
// then we use callback. in fs.appendFile (err,data) =>
  // and if all goes well, we end the response with 
    // res.end("hello from server")
const myServer = http.createServer((req,res) => {
    const log = `${Date.now()}: New Req Recieved\n`;
     fs.appendFile('log.txt', log, (err,data) => {
          res.end("Hello from Server Again");
     } );
  

});

// to create a server
// req and res are two arguments of the callback function
// this handles the request.
// req will store the client's metadat and the type of request in an object form.
// we can pass/return the response with res variable.


// const myServer = http.createServer((req, res) => {
//   console.log(req);
//   // the req object has a lot of properties and functionalities of the client request.
//   // like req.header etc
//   res.end("Hello From Server Again!");
// });


// to run a server we need a port and port number
// on this port, we will make the 
// make the server listen for the incoming request.
myServer.listen(8000, () => console.log("Server Started") );
