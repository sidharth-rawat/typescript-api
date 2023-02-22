import { Application } from "express";
import express = require("express");
import mongoose = require("mongoose");
import { logger } from "./util/Logger";

export class App {
    public app: Application;

    private apiPath: string = '/api';

    /**
     * @param port Port Application listens on
     * @param middleware Array of middleware to be applied to app 
     * @param options - Array of options for app
     * @param routes Array of express.Router objects for application routes
     */
    constructor(
        private port: number,
        middleware: Array<any>,
        routes: Record<string, express.Router>
    ) {
        this.app = express();
        this.middleware(middleware);
        this.routes(routes);
    }

    /**
     * @param _middleware Array of middleware to be loaded into express app
    */
    private middleware(_middleware: any[]) {
        _middleware.forEach((m) => {
            this.app.use(m);
        });
    }

    /**
     * Attaches route objects to app, appending routes to `apiPath`
     * @param routes Array of router objects to be attached to the app
     */
    private routes(routes: Record<string, express.Router>) {
        for(const _routeKey in routes){
            this.app.use(`${this.apiPath}/${_routeKey}`, routes[_routeKey]);
        }
     
    }

    /* Enable express to serve up static assets*/
  

    /**
     * Creates a connection to a MongoDB instance using mongoose
     * @param uri MongoDB connection string
    */
    public mongoDB(uri: string) {
        const connect = () => {
            const options: mongoose.ConnectOptions = { keepAlive: true };
            mongoose.set('strictQuery', false);
            mongoose.connect(uri, options).then(() => {
                logger.info('DB connected successfully');
            }).catch((error) => {
                logger.warn("DB Connection failed.")
                logger.error(error);
                return process.exit(1);
            });
        };
        
        connect();

        mongoose.connection.on("disconnected", connect);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`[${process.env.NODE_ENV}] - Server started at http://localhost:${this.port}${this.apiPath}`);
        });
    }
}
