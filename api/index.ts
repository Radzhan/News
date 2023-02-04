import express from "express";
import mysqlDb from "./mysqlDb";

const app = express();
const port = 8000;

app.use(express.json());

const run = async () => {
    await mysqlDb.init();
    
    app.listen(port, () => {
        console.log('we are live on ' + port);
    });
};

run().catch(console.error);