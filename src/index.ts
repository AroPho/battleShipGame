import express from 'express';
import bodyParser from 'body-parser';
import { gameRoutes } from './routes/gameRoutes';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use('/game', gameRoutes);
app.use(cors());
app.use(express.static('public'));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export { app, server };
