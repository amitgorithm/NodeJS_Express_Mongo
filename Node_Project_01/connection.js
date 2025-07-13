const mongoose = require("mongoose");

// Connect to MongoDB

async function connectmongoDb(url){ 
return mongoose.connect(url);
  
};

module.exports = {
  connectMongoDb,
};