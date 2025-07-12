const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// In-memory "database"
let todos = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  if (task.trim() === '') {
    return res.redirect('/?error=1');
  }
  todos.push({ task: task.trim(), priority });
  res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  todos.splice(index, 1);
  res.redirect('/');
});

app.post('/edit/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const newTask = req.body.newTask;
  const newPriority = req.body.newPriority;
  if (newTask.trim() !== '') {
    todos[index].task = newTask.trim();
    todos[index].priority = newPriority;
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
