import express from 'express';
const router = express.Router();

// Mock database
let todos = [];

// Getting the list of todos from the mock database
router.get('/', (req, res) => {
    res.send(todos);
})

// Getting a todo from the mock database
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);
    if (todo)
        res.send(todo);
    else res.send('Todo not found');
})

// Adding a new todo to our mock database
router.post('/', (req, res) => {
    const todo = req.body;
    todos.push({ ...todo, id: todos.length + 1 });
    res.send(`${todo.task} has been added to the Database`);
})

// Changing an existing todo in our mock database
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    todos = todos.map(todo => todo.id === id ? updatedTodo : todo);
    res.send(`${id} has been changed in the Database`);
})

// Deleting a todo from our mock database
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(todo => todo.id !== id)
    res.send(`${id} deleted successfully`);
})

export default router