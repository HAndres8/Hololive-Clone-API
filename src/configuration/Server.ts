import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import Connection from "./Connection";
import apiTalentRoute from "../route/TalentRoute";
import apiGenerationRoute from "../route/GenerationRoute";
import apiBranchRoute from "../route/BranchRoute";

class Server {
    public app:express.Application;

    constructor() {
        dotenv.config({ path:"variable.env" });
        Connection();
        this.app = express();
        this.startConf();
        this.startRoutes();
    };

    public startConf() {
        this.app.set("PORT", process.env.PORT);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({ limit:"50MB" }));
        this.app.use(express.urlencoded({ extended:true }));
    };

    public startRoutes() {
        this.app.use("/talents", apiTalentRoute);
        this.app.use("/generations", apiGenerationRoute);
        this.app.use("/branches", apiBranchRoute);
    };

    public startServer() {
        this.app.listen(this.app.get("PORT"), ()=>{
            console.log("Backend ready in the port:", this.app.get("PORT"));
        });
    };
}

export default Server;