import express from "express";
import { OkPacket } from "mysql2";
import mysqlDb from "../mysqlDb";

const locationRouter = express.Router();

locationRouter.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: "Name are required" });
  }

  const locationData = {
    name: req.body.name,
    description: req.body.description,
  };

  const connection = mysqlDb.getConnection();
  const result = await connection.query(
    "INSERT INTO location (name, description) VALUES (? ,?)",
    [locationData.name, locationData.description]
  );

  const info = result[0] as OkPacket;

  res.send({
    ...locationData,
    id: info.insertId,
  });
});

locationRouter.get("/", async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query("SELECT id , name FROM location");
  const item = result[0];
  res.send(item);
});

locationRouter.get("/:id", async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query("select * FROM location WHERE id = ?", [
    req.params.id,
  ]);
  const items = result[0] as LocationAndCategori[];
  const item = items[0];
  if (!item) {
    return res.status(404).send({ error: "Not found" });
  }
  res.send(item);
});

locationRouter.delete("/:id", async (req, res) => {
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

export default locationRouter;
