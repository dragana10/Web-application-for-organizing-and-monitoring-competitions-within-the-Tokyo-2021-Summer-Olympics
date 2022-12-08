import express from 'express'
import { SportsController } from '../controllers/sports.controller';

const sportsRouter = express.Router();

sportsRouter.route('/find_all_sports').get(
    (req, res)=> new SportsController().find_all_sports(req,res)
)
sportsRouter.route('/get_sport_by_name').post(
    (req, res)=> new SportsController().get_sport_by_name(req,res)
)
sportsRouter.route('/find_all_disciplines').get(
    (req, res)=> new SportsController().find_all_disciplines(req,res)
)
sportsRouter.route('/find_disciplines_for_sport').post(
    (req, res)=> new SportsController().find_disciplines_for_sport(req,res)
)
sportsRouter.route('/find_discipline_by_name').post(
    (req, res)=> new SportsController().find_discipline_by_name(req,res)
)
sportsRouter.route('/enter_discipline').post(
    (req, res)=> new SportsController().enter_discipline(req,res)
)
sportsRouter.route('/enter_sport').post(
    (req, res)=> new SportsController().enter_sport(req,res)
)
sportsRouter.route('/get_all_locations_for_sport').post(
    (req, res)=> new SportsController().get_all_locations_for_sport(req,res)
)
sportsRouter.route('/get_all_locations_for_discipline').post(
    (req, res)=> new SportsController().get_all_locations_for_discipline(req,res)
)
sportsRouter.route('/get_all_levels_for_sport').post(
    (req, res)=> new SportsController().get_all_levels_for_sport(req,res)
)
sportsRouter.route('/get_loc_by_name').post(
    (req, res)=> new SportsController().get_loc_by_name(req,res)
)
sportsRouter.route('/get_lev_by_name').post(
    (req, res)=> new SportsController().get_lev_by_name(req,res)
)
sportsRouter.route('/set_time_for_loc').post(
    (req, res)=> new SportsController().set_time_for_loc(req,res)
)
sportsRouter.route('/remove_time_for_loc').post(
    (req, res)=> new SportsController().remove_time_for_loc(req,res)
)
sportsRouter.route('/get_holder_table').post(
    (req, res)=> new SportsController().get_holder_table(req,res)
)
sportsRouter.route('/set_holder_in_candidates').post(
    (req, res)=> new SportsController().set_holder_in_candidates(req,res)
)
sportsRouter.route('/set_first_holder').post(
    (req, res)=> new SportsController().set_first_holder(req,res)
)
sportsRouter.route('/set_second_holder').post(
    (req, res)=> new SportsController().set_second_holder(req,res)
)
sportsRouter.route('/set_third_holder').post(
    (req, res)=> new SportsController().set_third_holder(req,res)
)
sportsRouter.route('/set_fourth_holder').post(
    (req, res)=> new SportsController().set_fourth_holder(req,res)
)
sportsRouter.route('/set_fifth_holder').post(
    (req, res)=> new SportsController().set_fifth_holder(req,res)
)
sportsRouter.route('/set_sixth_holder').post(
    (req, res)=> new SportsController().set_sixth_holder(req,res)
)
sportsRouter.route('/set_seventh_holder').post(
    (req, res)=> new SportsController().set_seventh_holder(req,res)
)
sportsRouter.route('/set_eighth_holder').post(
    (req, res)=> new SportsController().set_eighth_holder(req,res)
)
sportsRouter.route('/set_ninth_holder').post(
    (req, res)=> new SportsController().set_ninth_holder(req,res)
)
sportsRouter.route('/set_tenth_holder').post(
    (req, res)=> new SportsController().set_tenth_holder(req,res)
)
sportsRouter.route('/set_eleventh_holder').post(
    (req, res)=> new SportsController().set_eleventh_holder(req,res)
)
sportsRouter.route('/set_twelfth_holder').post(
    (req, res)=> new SportsController().set_twelfth_holder(req,res)
)
sportsRouter.route('/set_thirteenth_holder').post(
    (req, res)=> new SportsController().set_thirteenth_holder(req,res)
)
sportsRouter.route('/set_fourteenth_holder').post(
    (req, res)=> new SportsController().set_fourteenth_holder(req,res)
)
sportsRouter.route('/set_fifteenth_holder').post(
    (req, res)=> new SportsController().set_fifteenth_holder(req,res)
)
sportsRouter.route('/set_sixteenth_holder').post(
    (req, res)=> new SportsController().set_sixteenth_holder(req,res)
)
sportsRouter.route('/get_holder_by_id').post(
    (req, res)=> new SportsController().get_holder_by_id(req,res)
)
export default sportsRouter;