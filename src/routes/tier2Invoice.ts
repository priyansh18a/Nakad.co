import {Request, Response} from "express";
import {getConnection} from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice"; 

export async function tier2Invoice(req:Request,res:Response):Promise<Response<Tier2Invoice>> {
    const invoice = req.body as Tier2Invoice;
     await getConnection().getRepository(Tier2Invoice).save(invoice);
     console.log("Tier2Invoice Created");
     return res.json(invoice); 
}
