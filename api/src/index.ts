import * as express from "express";
import * as cors from "cors";

const PORT = 8080;

const app = express();
app.use(cors());

app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
