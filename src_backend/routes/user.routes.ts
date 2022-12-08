import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req,res)
)
userRouter.route('/change_pass').post(
    (req, res)=> new UserController().change_pass(req,res)
)
userRouter.route('/register').post(
    (req, res)=> new UserController().register(req,res)
)
userRouter.route('/find_non_acc_deleg').get(
    (req, res)=> new UserController().find_non_acc_deleg(req,res)
)
userRouter.route('/find_non_acc_lead').get(
    (req, res)=> new UserController().find_non_acc_lead(req,res)
)
userRouter.route('/find_acc_deleg').get(
    (req, res)=> new UserController().find_acc_deleg(req,res)
)
userRouter.route('/find_acc_and_free_deleg').get(
    (req, res)=> new UserController().find_acc_and_free_deleg(req,res)
)
userRouter.route('/find_acc_lead').get(
    (req, res)=> new UserController().find_acc_lead(req,res)
)
userRouter.route('/accept').post(
    (req, res)=> new UserController().accept(req,res)
)
userRouter.route('/is_there_a_leader').post(
    (req, res)=> new UserController().is_there_a_leader(req,res)
)
userRouter.route('/accept_leader').post(
    (req, res)=> new UserController().accept_leader(req,res)
)
userRouter.route('/remove_req').post(
    (req, res)=> new UserController().remove_req(req,res)
)
userRouter.route('/find_deleg_by_name_and_lastname').post(
    (req, res)=> new UserController().find_deleg_by_name_and_lastname(req,res)
)
userRouter.route('/find_deleg_by_name_and_lastname_for_comp').post(
    (req, res)=> new UserController().find_deleg_by_name_and_lastname_for_comp(req,res)
)
userRouter.route('/find_user_by_username').post(
    (req, res)=> new UserController().find_user_by_username(req,res)
)
export default userRouter;