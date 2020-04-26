import { Response, Request, Router } from "express";
import { Transaction } from "models/transaction";
import { TransactionsAdapter } from "db/adapters/transactions";

export default (adapter: TransactionsAdapter): Router => {
  return Router()
    .get("/", (req: Request, res: Response) => {
      const transactions: Transaction[] = adapter.getAll();
      res.send({
        transactions,
      });
    })
    .get("/:id", (req: Request, res: Response) => {
      const transaction: Transaction = adapter.get(req.params.id);
      res.send(transaction);
    })
    .post("/", (req: Request, res: Response) => {
      const transaction: Transaction = adapter.create(req.body);
      res.send(transaction);
    })
    .put("/:id", (req: Request, res: Response) => {
      const transaction: Transaction = adapter.update(req.params.id, req.body);
      res.send(transaction);
    })
    .delete("/:id", (req: Request, res: Response) => {
      adapter.remove(req.params.id);
      res.sendStatus(204);
    });
};
