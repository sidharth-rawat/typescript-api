
    import { Router } from "express";
import {  userRouter } from './user.routes';

export const allRoutes: Record<string, Router> = {
    'user': userRouter
}
