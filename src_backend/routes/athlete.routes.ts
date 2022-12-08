import express from 'express'
import { AthleteController } from '../controllers/athlete.controller';

const athleteRouter = express.Router();

athleteRouter.route('/search_athletes').post(
    (req, res)=> new AthleteController().search_athletes(req,res)
)
athleteRouter.route('/search_athletes_all').get(
    (req, res)=> new AthleteController().search_athletes_all(req,res)
)
athleteRouter.route('/get_all_athletes_for_country').post(
    (req, res)=> new AthleteController().get_all_athletes_for_country(req,res)
)
athleteRouter.route('/get_all_athletes_for_country_and_sport').post(
    (req, res)=> new AthleteController().get_all_athletes_for_country_and_sport(req,res)
)
athleteRouter.route('/get_all_athletes_for_country_and_disc').post(
    (req, res)=> new AthleteController().get_all_athletes_for_country_and_disc(req,res)
)
athleteRouter.route('/set_new_athlete').post(
    (req, res)=> new AthleteController().set_new_athlete(req,res)
)
athleteRouter.route('/add_medals_to_new_one').post(
    (req, res)=> new AthleteController().add_medals_to_new_one(req,res)
)
athleteRouter.route('/add_medals_all').get(
    (req, res)=> new AthleteController().add_medals_all(req,res)
)
athleteRouter.route('/set_first_disc').post(
    (req, res)=> new AthleteController().set_first_disc(req,res)
)
athleteRouter.route('/set_bronze').post(
    (req, res)=> new AthleteController().set_bronze(req,res)
)
athleteRouter.route('/set_silver').post(
    (req, res)=> new AthleteController().set_silver(req,res)
)
athleteRouter.route('/set_gold').post(
    (req, res)=> new AthleteController().set_gold(req,res)
)
athleteRouter.route('/find_athl_by_name_and_lastname_country').post(
    (req, res)=> new AthleteController().find_athl_by_name_and_lastname_country(req,res)
)
export default athleteRouter;