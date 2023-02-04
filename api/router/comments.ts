import express from "express";
import { OkPacket } from "mysql2";
import mysqlDb from "../mysqlDb";
import { Comment } from "../types";

const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
  if (!req.body.post_id || !req.body.text) {
    return res.status(400).send({ error: "Name are required" });
  }

  const locationData = {
    post_id: req.body.post_id,
    text: req.body.text,
    author: req.body.author,
  };

  if (!req.body.author) {
    locationData.author = "anonymous";
  }

  const connection = mysqlDb.getConnection();
  const result = await connection.query(
    "INSERT INTO Comment (post_id, text, author) VALUES (? ,?, ?)",
    [locationData.post_id, locationData.text, locationData.author]
  );

  const info = result[0] as OkPacket;

  res.send({
    ...locationData,
    id: info.insertId,
  });
});

commentRouter.get("/", async (req, res) => {
  const Querydate = req.query.news_id as string;
  const connection = mysqlDb.getConnection();

  if (Querydate === undefined) {
    const result = await connection.query("SELECT * FROM Comment");

    res.send(result[0]);
  } else {
    const resultComment = await connection.query(
      "select * from Comment where post_id = ?",
      [Querydate]
    );

    res.send(resultComment[0]);
  }
});

commentRouter.delete("/:id", async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query("DELETE FROM Comment WHERE id = ?", [
    req.params.id,
  ]);
  const item = result[0] as OkPacket;

  if (item.affectedRows === 0) {
    res.send("incorrect Comment id");
  } else {
    res.send("News deleted");
  }
});

export default commentRouter;
