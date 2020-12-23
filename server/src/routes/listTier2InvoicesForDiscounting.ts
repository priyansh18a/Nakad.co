import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { ActorMappings } from "../database/entity/ActorMappings";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { DiscountedTier2Invoice } from "../models/DiscountedTier2Invoice";
import * as MoneyUtil from "../util/MoneyUtil";

// Request has query param named tier2Id
export async function listTier2InvoicesForDiscounting(req: Request, res: Response) {
  const tier2Id = parseInt(req.query.tier2Id[0], 10);
  const tier1Ids = (
    await getConnection()
      .getRepository(ActorMappings)
      .find({
        where: {
          childId: tier2Id,
        },
        select: ["parentId"],
      })
  ).map((mapping) => mapping.parentId);
  return res.json(await listTier2InvoicesForDiscountingInternal(tier2Id, tier1Ids));
}

export async function listTier2InvoicesForDiscountingInternal(
  tier2Id: number,
  tier1Ids: number[]
): Promise<DiscountedTier2Invoice[]> {
  const currentDate = new Date();
  const anchorInvoices = await getConnection()
    .createQueryBuilder()
    .select("AI")
    .from(AnchorInvoice, "AI")
    .leftJoin(AnchorTier2InvoiceMapping, "ATM", '"AI"."InvoiceId" = "ATM"."AnchorInvoiceId"')
    .where('"ATM"."AnchorInvoiceId" IS NULL')
    .andWhere('"AI"."Tier1Id" IN (:...ids)', { ids: tier1Ids })
    .andWhere('"AI"."DueDate" > :dueDate', { dueDate: currentDate.toISOString() })
    .orderBy('"AI"."DueDate"', "ASC")
    .getMany();
  // console.log("anchorInvoices: " + JSON.stringify(anchorInvoices));

  const tier2Invoices = await getConnection()
    .getRepository(Tier2Invoice)
    .find({
      where: {
        approvalStatus: "Approved",
        tier2Id,
      },
      order: {
        dueDate: "ASC",
      },
    });

  let j = 0;
  const invoiceToReturn: DiscountedTier2Invoice[] = [];
  // TODO(harshil) This logic will need change.
  for (const tier2Invoice of tier2Invoices) {
    if (j >= anchorInvoices.length) break;
    const anchorInvoice = anchorInvoices[j];
    if (
      tier2Invoice.dueDate <= anchorInvoice.dueDate &&
      MoneyUtil.lessThanOrEqual(tier2Invoice.invoiceAmount, anchorInvoice.invoiceAmount)
    ) {
      const interestRate = 15 / 100;
      const daysPending = Math.floor((anchorInvoice.dueDate.valueOf() - new Date().valueOf()) / 86400000);
      console.log(daysPending);
      const hairCut = parseFloat(((Math.max(daysPending, 0) / 365) * interestRate).toFixed(4));
      const discountedAmount = MoneyUtil.subtract(
        tier2Invoice.invoiceAmount,
        MoneyUtil.multiply(tier2Invoice.invoiceAmount, hairCut)
      );
      invoiceToReturn.push({
        tier2Invoice,
        discountedAmount,
        discountedAnnualRatePercentage: hairCut * 100,
        status: "Pending",
        partAnchorInvoices: [{ anchorInvoice, partialAmount: tier2Invoice.invoiceAmount }],
      });
      j++;
    }
  }

  return invoiceToReturn;
}
