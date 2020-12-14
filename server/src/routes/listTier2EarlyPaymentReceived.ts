import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { Tier1PayableReceivable } from "../models/Tier1PayableReceivable";

// Request has query param named tier2Id
export async function listTier2EarlyPaymentReceived(
  req: Request,
  res: Response
): Promise<Response<Tier1PayableReceivable[]>> {
  const tier2Id = parseInt(req.query.tier2Id[0], 10);

  const tier2Invoices = await getConnection()
    .createQueryBuilder()
    .select("T2")
    .from(Tier2Invoice, "T2")
    .leftJoin(AnchorTier2InvoiceMapping, "ATM", '"T2"."InvoiceId" = "ATM"."Tier2InvoiceId"')
    .where('"ATM"."BankApprovalStatus" = \'Approved\'')
    .andWhere('"ATM"."Tier2Id" = :id', { id: tier2Id })
    .getMany();

  const anchorInvoices = await getConnection()
    .createQueryBuilder()
    .select("AI")
    .from(AnchorInvoice, "AI")
    .leftJoin(AnchorTier2InvoiceMapping, "ATM", '"AI"."InvoiceId" = "ATM"."AnchorInvoiceId"')
    .where('"ATM"."BankApprovalStatus" = \'Approved\'')
    .andWhere('"ATM"."Tier2Id" = :id', { id: tier2Id })
    .getMany();

  const invoiceToReturn: Tier1PayableReceivable[] = [];

  let j = 0;
  for (const tier2Invoice of tier2Invoices) {
    if (j >= anchorInvoices.length) break;
    const anchorInvoice = anchorInvoices[j];
    invoiceToReturn.push({
      tier2Invoice,
      discountedAmount: tier2Invoice.invoiceAmount.multiply(0.85), // TODO(Priyanshu) Disconted amount need to fetch from database
      partAnchorInvoices: { anchorInvoice, partialAmount: tier2Invoice.invoiceAmount },
    });
    j++;
  }

  return res.json(invoiceToReturn);
}
