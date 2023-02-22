import { Request, Response, Router } from "express";
import { _userController} from "../controller/user.controller";
import { createUserValidator } from "../util/index";

export const userRouter = Router();

userRouter
    .get('/', (req: Request, res: Response) => _userController.find(res, {}))
    .get('/:id', (req: Request, res: Response) => _userController.findOne(res, {_id: req.params.id}))
    .post('/', createUserValidator, (req, res) => _userController.create(res, req.body))
    .put('/:id', (req, res) => _userController.update(res, req.params.id, req.body))
    .delete('/:id', (req, res) => _userController.delete(res, req.params.id));

