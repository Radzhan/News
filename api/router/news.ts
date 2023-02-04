import express from "express";
import { OkPacket } from "mysql2";
import { imagesUpload } from "../multer";
import mysqlDb from "../mysqlDb";
import { Comment, Post } from "../types";

const newsRouter = express.Router();

newsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
  if (!req.body.title || !req.body.text) {
    return res.status(400).send({ error: "Title and text are required" });
  }

  const itemData = {
    title: req.body.title,
    text: req.body.text,
    image: req.file ? req.file.filename : null,
  };

  const connection = mysqlDb.getConnection();
  const result = await connection.query(
    "INSERT INTO Post (title, text, image) VALUES (? ,?, ?)",
    [itemData.title, itemData.text, itemData.image]
  );

  const info = result[0] as OkPacket;

  res.send({
    ...itemData,
    id: info.insertId,
  });
});

newsRouter.get("/", async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query(
    "SELECT id , title, image, date FROM Post"
  );
  const item = result[0];
  res.send(item);
});

newsRouter.get("/:id", async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query("select * FROM Post WHERE id = ?", [
    req.params.id,
  ]);
  const items = result[0] as Post[];
  const item = items[0];
  if (!item) {
    return res.status(404).send({ error: "Not found" });
  }
  res.send(item);
});

newsRouter.delete("/:id", async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query("DELETE FROM location WHERE id = ?", [
    req.params.id,
  ]);
  const item = result[0] as OkPacket;
  if (item.affectedRows === 0) {
    return res.send("incorrect location");
  } else {
    return res.send("location was delete");
  }
});

export default newsRouter;
