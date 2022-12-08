import express from 'express'
import { CompetitionsController } from '../controllers/competitions.conroller';

const competitionsRouter = express.Router();

competitionsRouter.route('/get_competition_by_name').post(
    (req, res)=> new CompetitionsController().get_competition_by_name(req,res)
)
competitionsRouter.route('/set_participant').post(
    (req, res)=> new CompetitionsController().set_participant(req,res)
)
competitionsRouter.route('/remove_participant').post(
    (req, res)=> new CompetitionsController().remove_participant(req,res)
)
competitionsRouter.route('/apply_athlete').post(
    (req, res)=> new CompetitionsController().apply_athlete(req,res)
)
competitionsRouter.route('/set_delegate').post(
    (req, res)=> new CompetitionsController().set_delegate(req,res)
)
competitionsRouter.route('/remove_delegate').post(
    (req, res)=> new CompetitionsController().remove_delegate(req,res)
)
competitionsRouter.route('/set_date_start').post(
    (req, res)=> new CompetitionsController().set_date_start(req,res)
)
competitionsRouter.route('/set_date_end').post(
    (req, res)=> new CompetitionsController().set_date_end(req,res)
)
competitionsRouter.route('/set_time_start').post(
    (req, res)=> new CompetitionsController().set_time_start(req,res)
)
competitionsRouter.route('/set_time_end').post(
    (req, res)=> new CompetitionsController().set_time_end(req,res)
)
competitionsRouter.route('/get_all_compet_for_delegate').post(
    (req, res)=> new CompetitionsController().get_all_compet_for_delegate(req,res)
)
competitionsRouter.route('/set_result').post(
    (req, res)=> new CompetitionsController().set_result(req,res)
)
competitionsRouter.route('/set_winner').post(
    (req, res)=> new CompetitionsController().set_winner(req,res)
)
competitionsRouter.route('/set_bronze').post(
    (req, res)=> new CompetitionsController().set_bronze(req,res)
)
competitionsRouter.route('/set_silver').post(
    (req, res)=> new CompetitionsController().set_silver(req,res)
)
competitionsRouter.route('/set_gold').post(
    (req, res)=> new CompetitionsController().set_gold(req,res)
)
competitionsRouter.route('/set_status').post(
    (req, res)=> new CompetitionsController().set_status(req,res)
)


competitionsRouter.route('/get_all_games_for_competition').post(
    (req, res)=> new CompetitionsController().get_all_games_for_competition(req,res)
)
competitionsRouter.route('/set_participant_in_game').post(
    (req, res)=> new CompetitionsController().set_participant_in_game(req,res)
)
competitionsRouter.route('/inc_curr_par_in_game').post(
    (req, res)=> new CompetitionsController().inc_curr_par_in_game(req,res)
)
competitionsRouter.route('/get_game').post(
    (req, res)=> new CompetitionsController().get_game(req,res)
)
competitionsRouter.route('/get_games_for_level').post(
    (req, res)=> new CompetitionsController().get_games_for_level(req,res)
)
competitionsRouter.route('/set_date_start_in_game').post(
    (req, res)=> new CompetitionsController().set_date_start_in_game(req,res)
)
competitionsRouter.route('/set_date_end_in_game').post(
    (req, res)=> new CompetitionsController().set_date_end_in_game(req,res)
)
competitionsRouter.route('/set_time_start_in_game').post(
    (req, res)=> new CompetitionsController().set_time_start_in_game(req,res)
)
competitionsRouter.route('/set_result_in_game').post(
    (req, res)=> new CompetitionsController().set_result_in_game(req,res)
)
competitionsRouter.route('/set_status_in_game').post(
    (req, res)=> new CompetitionsController().set_status_in_game(req,res)
)
competitionsRouter.route('/set_winner_in_game').post(
    (req, res)=> new CompetitionsController().set_winner_in_game(req,res)
)
competitionsRouter.route('/set_participant_in_game_simply').post(
    (req, res)=> new CompetitionsController().set_participant_in_game_simply(req,res)
)
competitionsRouter.route('/get_game_simply').post(
    (req, res)=> new CompetitionsController().get_game_simply(req,res)
)
competitionsRouter.route('/set_date_start_in_game_simply').post(
    (req, res)=> new CompetitionsController().set_date_start_in_game_simply(req,res)
)
competitionsRouter.route('/set_date_end_in_game_simply').post(
    (req, res)=> new CompetitionsController().set_date_end_in_game_simply(req,res)
)
competitionsRouter.route('/set_time_start_in_game_simply').post(
    (req, res)=> new CompetitionsController().set_time_start_in_game_simply(req,res)
)
competitionsRouter.route('/set_result_in_game_simply').post(
    (req, res)=> new CompetitionsController().set_result_in_game_simply(req,res)
)
competitionsRouter.route('/set_winner_in_game_simply').post(
    (req, res)=> new CompetitionsController().set_winner_in_game_simply(req,res)
)

export default competitionsRouter;