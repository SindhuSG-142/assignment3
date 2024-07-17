const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Read db.json
const dbPath = `${C:\Users\rajun\OneDrive\Desktop\masai\assignment3\db.json}`;

// Function to read todos from db.json
function readTodos() {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

// Function to save todos to db.json
function saveTodos(todos) {
  fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
}

// API to get all todos
app.get('/todos', (req, res) => {
  const todos = readTodos().todos;
  res.json(todos);
});

// API to add a new todo
app.post('/todos', (req, res) => {
  const todos = readTodos().todos;
  const newTodo = req.body;
  todos.push(newTodo);
  saveTodos({ todos });
  res.status(201).send('Todo added successfully');
});

// API to update status of even ID todos from false to true
app.put('/todos/updateEven', (req, res) => {
  const todos = readTodos().todos;
  todos.forEach(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
  });
  saveTodos({ todos });
  res.send('Status of even ID todos updated');
});

// API to delete todos whose status is true
app.delete('/todos/deleteCompleted', (req, res) => {
  let todos = readTodos().todos;
  todos = todos.filter(todo => !todo.status);
  saveTodos({ todos });
  res.send('Completed todos deleted');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
