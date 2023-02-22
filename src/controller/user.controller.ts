import { ILogin , Login } from "../model";
import { BaseController } from "./Controller";

class userController extends BaseController<ILogin> {}

export const _userController = new userController(Login);