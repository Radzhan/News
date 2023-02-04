import express from "express";
import cors from "cors"
import mysqlDb from "./mysqlDb";
import commentRouter from "./router/comments";
import newsRouter from "./router/news";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())
app.use('/comments', commentRouter);
app.use('/news', newsRouter);

const run = async () => {
    await mysqlDb.init();
    
    app.listen(port, () => {
        console.log('we are live on ' + port);
    });
};

run().catch(console.error);

