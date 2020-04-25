import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import db from "./db";
import { Transaction } from "models";

const PORT = 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/api/transactions", (req: express.Request, res: express.Response) => {
  const transactions: Transaction[] = db.transactions.getAll();
  res.send({
    transactions,
  });
});

app.get("/api/transactions/:id", (req: express.Request, res: express.Response) => {
  const transaction: Transaction = db.transactions.get(req.params.id);
  res.send(transaction);
});

app.post("/api/transactions", (req: express.Request, res: express.Response) => {
  const transaction: Transaction = db.transactions.create(req.body);
  res.send(transaction);
});

app.put("/api/transactions/:id", (req: express.Request, res: express.Response) => {
  const transaction: Transaction = db.transactions.update(req.params.id, req.body);
  res.send(transaction);
});

app.delete("/api/transactions/:id", (req: express.Request, res: express.Response) => {
  db.transactions.remove(req.params.id);
  res.sendStatus(204);
});

// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
