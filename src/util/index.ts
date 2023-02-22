import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { dataValidator } from "../model/index";


export const http_formatter = (data: any, message: string = 'ok', success: boolean = true) => {
    if (success === false && data.code == 11000) {
        message = ``;
        Object.keys(data.keyValue).forEach(key => {
            message += `${key} : ${data.keyValue[key]} already exist in our record. `
        })
    }
    if(success === false && data.name === 'ZodError'){
        message = data.issues.map((el: any) => (
            `${el.path.join(",")} : ${el.message}`
        )).join(". ");
    }
    if (success === false && data.name == "ValidationError") message = data.message;

    return { data, success, message }
}

export const isEmail = (email: string):boolean =>  {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};
export const isPhone = (phone: string): boolean => {
    return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(phone)
  };


export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
    const isValid = dataValidator.safeParse(req.body);
    if(isValid.success) {
        next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json(
            http_formatter(isValid.error, "Teacher validation failed, please check", false)
        )
    }
}


