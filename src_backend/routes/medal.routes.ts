import express from 'express';
import { MedalController } from '../controllers/medal.controller';

const medalRouter = express.Router();

medalRouter.route('/find_all').get(
    (req, res)=> new MedalController().find_all(req, res)
)


export default medalRouter;