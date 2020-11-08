import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { listTier2InvoicesForApproval } from "./routes/listTier2InvoicesForApproval";
import { updateTier2InvoiceForApproval } from "./routes/updateTier2InvoiceForApproval";
import { listTier2InvoicesForDiscounting } from "./routes/listTier2InvoicesForDiscounting";
import { updateTier2InvoicesForDiscounting } from "./routes/updateTier2InvoicesForDiscounting";
import { tier2Invoice } from "./routes/tier2Invoice";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8082;
app.use(express.json());

createConnection()
  .then(async (connection) => {
    app.get("/", (req, res) => res.send("Express + TypeScript Server"));

    app.post("/Tier2Invoice", tier2Invoice);

    app.get("/ListTier2InvoicesForApproval", listTier2InvoicesForApproval);
    app.post("/UpdateTier2InvoiceForApproval", updateTier2InvoiceForApproval);
    app.get("/ListTier2InvoicesForDiscounting", listTier2InvoicesForDiscounting);
    app.post("/UpdateTier2InvoiceForDiscounting", updateTier2InvoicesForDiscounting);

    app.listen(PORT, () => {
      // tslint:disable-next-line: no-console
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
