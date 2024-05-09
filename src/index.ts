import express from 'express';
import * as gameController from './controllers/gameController';

const router = express.Router();

router.post('/create', gameController.createGame);
router.post('/placeShip', gameController.placeShip);
router.post('/attack', gameController.attack);
router.get('/status', gameController.checkGameStatus);


export { router as gameRoutes };