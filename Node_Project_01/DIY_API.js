const express = require('express');
const app = express();
const PORT = 8001;

const userList = require('./MOCK_DATA.json');

// REST API :

app.get("/api/users/:id", (req,res) => {
  const id = Number(req.params.id);
  const userDetails = userList.find((userDetails) => userDetails.id === id);
  return res.json(userDetails);
})

app.get("/users", (req,res) => {
  // res.end("hello");
  res.json(userList);
  
})


app.listen(PORT , () => { console.log(`Server started at PORT: ${PORT}`)});