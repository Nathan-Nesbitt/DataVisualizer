import { Express, Request, Response } from "express";
import express from 'express';
import path from 'path';
import MainController from "./controllers/Queries"

export class Server {

    private app: Express;

    private mainController;


    constructor(app: Express) {
        this.app = app;

        this.mainController = new MainController();

        // if(process.argv.includes("production"))
        console.log(__dirname)

        this.app.get("/api", (req: Request, res: Response): void => {
            res.send("REST API V0.0.1");
        });

        this.app.get("/api/serial_nums", this.mainController.get_serial_nums);

        this.app.get("/api/device_ids", this.mainController.get_device_ids);

        this.app.get("/api/limited_data", this.mainController.get_limited_data);

        this.app.get("/api/summary", this.mainController.summary);

        if (process.env.PRODUCTION) {
            // Serve any static files
            app.use(express.static(path.join(__dirname, '/../../frontend/build')));
            // Handle React routing, return all requests to React app
            app.get('*', function (req, res) {
                res.sendFile(path.join(__dirname, '/../../frontend/build', 'index.html'));
            });
        }
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

}