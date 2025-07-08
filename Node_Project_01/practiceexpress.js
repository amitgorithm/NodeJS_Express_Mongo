const express = require('express');
const app = express();
const PORT = 5002;

const allUserDB = require('./MOCK_DATA.json');
app.listen(PORT, ()=> console.log('Server conected to: ${PORT}'));


