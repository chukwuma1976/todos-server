import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

const router = express.Router();
const file = "./allTodos.json"

// Mock database
let todos = [];
fs.readFile(file, (error, data) => {
    if (error) {
        console.log('Could not read file');
        throw error;
    }
    todos = JSON.parse(data) || [];
});

function writeJSON(todos) {
    const data = JSON.stringify(todos, null, 2);
    fs.writeFile(file, data, error => {
        if (error) {
            console.log('Could not write file');
            throw error;
        } else console.log('File written successfully');
    })
}

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
    todos.push({ ...todo, id: uuidv4() });
    res.send(`${todo.task} has been added to the Database`);
    writeJSON(todos);
})

// Changing an existing todo in our mock database
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    todos = todos.map(todo => todo.id === id ? updatedTodo : todo);
    res.send(`${id} has been changed in the Database`);
    writeJSON(todos);
})

// Deleting a todo from our mock database
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(todo => todo.id !== id)
    res.send(`${id} deleted successfully`);
    writeJSON(todos);
})

export default router