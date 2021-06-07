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

        app.use(express.static(path.join(__dirname, 'build')));

        this.app.get("/api", (req: Request, res: Response): void => {
            res.send("REST API V0.0.1");
        });

        this.app.get("/api/serial_nums", this.mainController.get_serial_nums);

        this.app.get("/api/device_ids", this.mainController.get_device_ids);

        this.app.get("/api/limited_data", this.mainController.get_limited_data);

        this.app.get("/api/summary", this.mainController.summary);



        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

}