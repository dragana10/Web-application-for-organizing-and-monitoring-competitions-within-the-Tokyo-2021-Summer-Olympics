import express from 'express';
import { CountryController } from '../controllers/country.controller';

const countryRouter = express.Router();

countryRouter.route('/find_all').get(
    (req, res)=> new CountryController().find_all(req, res)
)


export default countryRouter;