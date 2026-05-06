const express = require('express');
const app = express();
const todoController = require('./controllers/todoController'); // Import your module
const authController = require('./controllers/authController');
require('dotenv').config();
const mongoose = require('mongoose');
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"])


app.use(express.json());
const PORT = process.env.PORT || 3000;
// Now your routes look much cleaner!
app.get('/todos', todoController.getAllTodos);
app.post('/todos', todoController.createTodo);
app.delete('/todos/:id', todoController.deleteTodo);
app.put('/todos/:id', todoController.updateTodo);
app.post('/register', authController.register);
app.post('/login', authController.login)
// app.patch('/todos/:id', todoController.patchTodo);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("Failed to connect:", err));