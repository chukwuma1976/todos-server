import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todos.js'

const app = express();
const PORT = 5000

app.use(bodyParser.json());
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));