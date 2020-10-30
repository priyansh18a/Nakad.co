import { getConnection } from "typeorm";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

export async function listTier2InvoicesForApproval(req, res) {
    const tier1Id = parseInt(req.query.tier1Id[0]);
    return res.json(await listTier2InvoicesForApprovalInternal(tier1Id));
}

async function listTier2InvoicesForApprovalInternal(tier1Id: Number): Promise<Tier2Invoice[]> {
    const tier2Invoices = await getConnection().createQueryBuilder()
        .select('t')
        .from(Tier2Invoice, 't')
        .where('"t"."ApprovalStatus" = \'Pending\'').andWhere('"t"."Tier1Id" = :id', {id: tier1Id})
        .orderBy('"t"."DueDate"', 'ASC').getMany();

    console.log("tier2Invoices: " + JSON.stringify(tier2Invoices));
    return tier2Invoices;
}
