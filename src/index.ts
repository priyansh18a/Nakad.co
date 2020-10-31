import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import express from 'express';
import {tier2Invoice} from "./routes/tier2invoice";
import { createConnection } from "typeorm";
import express from 'express';
import { listTier2InvoicesForApproval } from "./routes/listTier2InvoicesForApproval";
import { updateTier2InvoiceForApproval } from "./routes/updateTier2InvoiceForApproval";

const app = express();
app.use(express.json());

const PORT = 8082;
app.use(express.json());
createConnection().then(async connection => {

    app.get('/', (req, res) => res.send('Express + TypeScript Server'));

    app.post('/Tier2Invoice',tier2Invoice);
    
    app.get('/ListTier2InvoicesForApproval', listTier2InvoicesForApproval);
    app.post('/UpdateTier2InvoiceForApproval', updateTier2InvoiceForApproval);

    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });

}).catch(error => console.log(error));