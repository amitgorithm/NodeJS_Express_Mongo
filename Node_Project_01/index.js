const express = require("express");
const fs = require('fs');
const mongoose = require('mongoose');

const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

// Connection to mongo
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error", err));

// Schema 
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName:  {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender:{
    type:String,
  }
})

const User = mongoose.model('user', userSchema);

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
          const user = users.find((user) => user.id === id);
          if(!user) return res.status(404).json({error : "User does not exist"});
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
    res.setHeader("X-myName", "Amit Jape");
    // always add X to custom headers
    console.log(req.headers);
    return res.json(users);
});      

app.post("/api/users", async (req,res) => {
      const body = req.body;
      if(!body || 
        !body.first_name || 
        !body.last_name ||
        !body.email || 
        !body.gender || 
        !body.job_title) 
        { 
        return res.status(400).json({msg: 'All fields are required'})
        } ;
      
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title
    });

    console.log('result');

    return res.status(202).json({msg: "success"});
     
});


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));