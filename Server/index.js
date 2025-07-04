const http = require("http");
const fs = require('fs');
// const url = require('url');
const express = require("express");

const app = express();

app.get("/", (req,res) => {
    return res.end("Hello From Home Page");
})

app.get("/about", (req,res) => {
    return res.end("Hello from About Page" + "Your name is : " + req.query.name);
})

app.get("/signup", (req,res)=>{
    return res.end("This is the Signup Page" + ' hey ' + req.query.name + ' you are ' + req.query.age);
})

app.listen(8000, () => console.log("Server Started via Express!"));

// const myServer = http.createServer(app);


function myHandler(req,res) {
    if(req.url === '/favicon.ico'){return res.end()};
    const log = `${Date.now()}: ${req.method} : ${req.url} New Req Recieved\n`;
    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);

      fs.appendFile('log.txt', log, (err,data) => {
          switch(myUrl.pathname){
              case '/': 
              if(req.method === 'GET') res.end('HomePage')
                break;
              case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi: ${username}`);
                break;
              case '/search':
                const search = myUrl.query.search_query;
                res.end("Your search is for : " + search);
              case '/signup':
                if(req.method==='GET') {
                  res.end("This is a signup form");
                } else if(req.method==='POST'){
                  // DB Query
                    res.end("Success");
                }
              default:
                  res.end("404 Not Found");

          }
          
     } );
      
    }

// we are creating alog for the users who hit the server/port
// we created a variable 'log'that stores the date.now 
//then we fs.appendFile withthe data in log variable,
// then we use callback. in fs.appendFile (err,data) =>
  // and if all goes well, we end the response with 
    // res.end("hello from server")


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
// myServer.listen(8000, () => console.log("Server Started") );
