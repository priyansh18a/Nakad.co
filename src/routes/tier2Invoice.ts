import {Request, Response} from "express";
import {getConnection} from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice"; 

export async function tier2Invoice(req:Request,res:Response):Promise<Response<Tier2Invoice>> {
    const {tier1Id,tier2Id,invoiceId,invoiceAmount,invoiceDate,dueDate,approvalStatus,grnId,receivableAmount} = req.body;
    const tier = req.body.tier1Id;
    const tier2 = req.body.tier2Id;

  //  console.log(req.body);
    const invoice = await getConnection().manager.create(Tier2Invoice,{
        tier1Id,tier2Id,invoiceId,invoiceAmount,invoiceDate,dueDate,approvalStatus,grnId,receivableAmount,tier,tier2
     })
     await getConnection().manager.save(invoice);
     console.log("Tier2Invoice Created");
     return res.json(invoice); 
}
