import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";

// dump environment variables in the process.env object
dotenv.config();
const port = process.env.PORT;

// initialize Express app
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
    console.log(
        `⚡️[server]: Zenika Meeting Planner API is running at https://localhost:${port}`
    );
});

export default app;
