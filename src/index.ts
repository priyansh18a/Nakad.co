import "reflect-metadata";
import { createConnection } from "typeorm";

import express from 'express';
import { listTier2InvoicesForApproval } from "./routes/listTier2InvoicesForApproval";

const app = express();
const PORT = 8082;

createConnection().then(async connection => {

    app.get('/', (req, res) => res.send('Express + TypeScript Server'));

    app.get('/ListTier2InvoicesForApproval', listTier2InvoicesForApproval);

    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });

}).catch(error => console.log(error));


