const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

//ROUTES 
app.get("/users", (req,res) => {
    const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});



// Middleware - Plugin of Express
app.use(express.urlencoded({ extended: false})); // built-in middleware


app.use((req,res,next) => {
  fs.appendFile('log.txt', `${Date.now()}:${req.ip} ${req.path}\n`, (err,data) => {
      next();
  })
  
});

// app.use((req,res,next) => {
//   console.log("Hello from middleware 2", req.myUserName);
//   return res.end("hey");
// });

app.use(express.json());

// Routes
app
    .route("/api/users/:id")
      .get((req,res)=> {
          const id = Number(req.params.id);
          const user = users.find((user) => user.id === id)
          return res.json(user);
        })
      .patch((req,res) => {
           const idToEdit = Number(req.params.id);
           const userIndex = users.findIndex(user => user.id === idToEdit);
          
           if (userIndex === -1) {
            return res.status(404).json({ error: "User not found "});
           }
           // update the user's fields with what's provided in req.body
           const updateUser = { ...users[userIndex], ...req.body};
           users[userIndex] = updateUser;
           fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err,data) => {
            if (err) {
              return res.status(500).json({ error: "Failed to update user"});
            }
            res.json({status: "success", user: updateUser});
           });
        })
      .delete((req,res) => {
          const idToDelete = Number(req.params.id);
          const userIndex = users.findIndex(user => user.id === idToDelete);

          if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
          }

          // Remove the user from the array
          const deletedUser = users.splice(userIndex, 1)[0];

          // Save the updated users array to the file
          fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
              return res.status(500).json({ error: "Failed to delete user" });
            }
            res.json({ status: "success", deleted: deletedUser });
          });
          
      });

// REST API 
app.get("/api/users", (req,res) => {
    return res.json(users);
});      

app.post("/api/users", (req,res) => {
      const body = req.body;
      users.push({...body, id:  users.length + 1});
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
           res.json({status: "success", id: users.length});
      });
     
});


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));