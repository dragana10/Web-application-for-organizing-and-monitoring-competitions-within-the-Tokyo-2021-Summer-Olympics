import express from 'express';
import { RecordsController } from '../controllers/records.controller';

const recordsRouter = express.Router();

recordsRouter.route('/find_all').get(
    (req, res)=> new RecordsController().find_all(req, res)
)


export default recordsRouter;