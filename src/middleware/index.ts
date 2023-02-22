import cors from "cors";
import bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import rateLimit from "express-rate-limit";

// const corsOptions: CorsOptions = {
//     origin: 'abc.com',
//     preflightContinue: true,
//     credentials: true,
// }

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export const __middleware = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    // cors(corsOptions),
    cors(), // cors("*")
    apiLimiter,
    (req: Request, res: Response, next: NextFunction) => {
      res.set('Cache-Control', 'no-store, max-age=0')
      next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", '*');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    },
    (error: any, req: Request, res: Response, next: NextFunction) => {
      if (error.type == 'time-out') return res.status(StatusCodes.REQUEST_TIMEOUT).json(error)
      else return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      })
    }
];

