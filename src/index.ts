import express from 'express';
import bodyParser from 'body-parser';
import { gameRoutes } from './routes/gameRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/game', gameRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});