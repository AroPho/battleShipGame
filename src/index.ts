import express from 'express';
import bodyParser from 'body-parser';
import { gameRoutes } from './routes/gameRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/game', gameRoutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export { app, server };