import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import adapters from "./db";
import accountsRoutes from "./routes/accounts";
import transactionRoutes from "./routes/transactions";

const PORT = 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/accounts", accountsRoutes(adapters.accounts));
app.use("/api/transactions", transactionRoutes(adapters.transactions));

// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
