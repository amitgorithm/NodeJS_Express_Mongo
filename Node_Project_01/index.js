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

// REST API 
app.get("/api/users", (req,res) => {
    return res.json(users);
});

// Middleware - Plugin of Express
app.use(express.urlencoded({ extended: false}));
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
         
          res.json({status: "Pending"});
      });
      

app.post("/api/users", (req,res) => {
      const body = req.body;
      users.push({...body, id:  users.length + 1});
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
           res.json({status: "success", id: users.length});
      });
     
});


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));