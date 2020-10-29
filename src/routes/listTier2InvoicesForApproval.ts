import { getConnection } from "typeorm";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

export async function listTier2InvoicesForApproval(req, res) {
    const tier1Id = parseInt(req.query.tier1Id[0]);
    return res.json(await listTier2InvoicesForApprovalInternal(tier1Id));
}

async function listTier2InvoicesForApprovalInternal(tier1Id: Number): Promise<Tier2Invoice[]> {
    const anchorInvoices = await getConnection().createQueryBuilder()
        .select('AI')
        .from(AnchorInvoice, 'AI')
        .leftJoin(AnchorTier2InvoiceMapping, 'ATM', '"AI"."InvoiceId" = "ATM"."AnchorInvoiceId"')
        .where('"ATM"."AnchorInvoiceId" IS NULL').andWhere('"AI"."Tier1Id" = :id', { id: tier1Id })
        .orderBy('"AI"."DueDate"', 'ASC')
        .getMany();
    console.log("anchorInvoices: " + JSON.stringify(anchorInvoices));

    const tier2Invoices = await getConnection().createQueryBuilder()
        .select('t')
        .from(Tier2Invoice, 't')
        .where('"t"."ApprovalStatus" = \'Pending\'')
        .orderBy('"t"."DueDate"', 'ASC').getMany();

    console.log("tier2Invoices: " + JSON.stringify(tier2Invoices));

    let j = 0;
    let invoiceToReturn = [];
    // TODO(harshil) This logic will need change.
    for (let i = 0; i < tier2Invoices.length; i++) {
        const inv: Tier2Invoice = tier2Invoices[i];

        if (j >= anchorInvoices.length)
            break;
        const anchorInvoice = anchorInvoices[j];
        if (inv.dueDate < anchorInvoice.dueDate && inv.invoiceAmount.lessThanOrEqual(anchorInvoice.invoiceAmount)) {
            invoiceToReturn.push(inv);
            j++;
        }
    }

    return invoiceToReturn;
}
