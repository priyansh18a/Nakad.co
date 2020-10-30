import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import express from 'express';
import {tier2Invoice} from "./routes/tier2invoice";
const app = express();
const PORT = 8082;
app.use(express.json());
createConnection().then(async connection => {

    app.get('/', (req, res) => res.send('Express + TypeScript Server'));
    app.post('/Tier2Invoice',tier2Invoice);
    
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });

}).catch(error => console.log(error));

