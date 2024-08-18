import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todos.js';
import cors from 'cors';

const app = express();
const PORT = 5000

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));