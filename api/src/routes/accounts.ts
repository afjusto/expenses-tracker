import { Response, Request, Router } from "express";
import { Account } from "models/account";
import { AccountsAdapter } from "db/adapters/accounts";

export default (adapter: AccountsAdapter): Router => {
  return Router()
    .get("/", (req: Request, res: Response) => {
      const accounts: Account[] = adapter.getAll();
      res.send({
        accounts,
      });
    })
    .get("/:id", (req: Request, res: Response) => {
      const account: Account = adapter.get(req.params.id);
      res.send(account);
    })
    .post("/", (req: Request, res: Response) => {
      const account: Account = adapter.create(req.body);
      res.send(account);
    })
    .put("/:id", (req: Request, res: Response) => {
      const account: Account = adapter.update(req.params.id, req.body);
      res.send(account);
    })
    .delete("/:id", (req: Request, res: Response) => {
      adapter.remove(req.params.id);
      res.sendStatus(204);
    });
};
