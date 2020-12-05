import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { DiscountedTier2Invoice } from "../models/DiscountedTier2Invoice";

// Request has query param named tier2Id
export async function listTier2InvoicesForDiscounting(req: Request, res: Response) {
  const tier1Id = parseInt(req.query.tier1Id[0], 10);
  const tier2Id = parseInt(req.query.tier2Id[0], 10);
  return res.json(await listTier2InvoicesForDiscountingInternal(tier1Id, tier2Id));
}

export async function listTier2InvoicesForDiscountingInternal(
  tier1Id: number,
  tier2Id: number
): Promise<DiscountedTier2Invoice[]> {
  const anchorInvoices = await getConnection()
    .createQueryBuilder()
    .select("AI")
    .from(AnchorInvoice, "AI")
    .leftJoin(AnchorTier2InvoiceMapping, "ATM", '"AI"."InvoiceId" = "ATM"."AnchorInvoiceId"')
    .where('"ATM"."AnchorInvoiceId" IS NULL')
    .andWhere('"AI"."Tier1Id" = :id', { id: tier1Id })
    .orderBy('"AI"."DueDate"', "ASC")
    .getMany();
  console.log("anchorInvoices: " + JSON.stringify(anchorInvoices));

  const tier2Invoices = await getConnection()
    .createQueryBuilder()
    .select("t")
    .from(Tier2Invoice, "t")
    .where('"t"."ApprovalStatus" = \'Approved\'')
    .andWhere('"t"."Tier2Id" = :id', { id: tier2Id })
    .orderBy('"t"."DueDate"', "ASC")
    .getMany();

  console.log("tier2Invoices: " + JSON.stringify(tier2Invoices));

  let j = 0;
  const invoiceToReturn: DiscountedTier2Invoice[] = [];
  // TODO(harshil) This logic will need change.
  for (const tier2Invoice of tier2Invoices) {
    if (j >= anchorInvoices.length) break;
    const anchorInvoice = anchorInvoices[j];
    if (
      tier2Invoice.dueDate <= anchorInvoice.dueDate &&
      tier2Invoice.invoiceAmount.lessThanOrEqual(anchorInvoice.invoiceAmount)
    ) {
      // TODO(harshil) Add logic for current date etc and calculate discounting amount
      invoiceToReturn.push({
        tier2Invoice,
        discountedAmount: tier2Invoice.invoiceAmount.multiply(0.85),
        discountedAnnualRatePercentage: 15,
        status: "Pending",
        partAnchorInvoices: [{ anchorInvoice, partialAmount: tier2Invoice.invoiceAmount }],
      });
      j++;
    }
  }

  return invoiceToReturn;
}
