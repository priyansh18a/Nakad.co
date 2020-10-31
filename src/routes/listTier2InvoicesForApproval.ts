import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

// Request has query param named tier1Id
export async function listTier2InvoicesForApproval(req: Request, res: Response) {
    const tier1Id = parseInt(req.query.tier1Id[0], 10);
    return res.json(await listTier2InvoicesForApprovalInternal(tier1Id));
}

async function listTier2InvoicesForApprovalInternal(tier1Id: number): Promise<Tier2Invoice[]> {
    const tier2Invoices = await getConnection().createQueryBuilder()
        .select('t')
        .from(Tier2Invoice, 't')
        .where('"t"."ApprovalStatus" = \'Pending\'').andWhere('"t"."Tier1Id" = :id', {id: tier1Id})
        .orderBy('"t"."DueDate"', 'ASC').getMany();

    console.log("tier2Invoices: " + JSON.stringify(tier2Invoices));
    return tier2Invoices;
}
