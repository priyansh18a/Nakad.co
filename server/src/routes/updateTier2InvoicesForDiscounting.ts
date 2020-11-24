import assert from "assert";
import { Request, Response } from "express";
import { DeepPartial, getConnection } from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { DiscountedTier2Invoice } from "../models/DiscountedTier2Invoice";
import { listTier2InvoicesForDiscountingInternal } from "./listTier2InvoicesForDiscounting";
import _ from "lodash";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";
import { tier2Invoice } from "./tier2Invoice";

// Request is a Tier2Invoice with status of Approved or Rejected
export async function updateTier2InvoicesForDiscounting(req: Request, res: Response): Promise<Response<any>> {
  const invoiceToDiscount: DiscountedTier2Invoice = req.body;
  const allPossibleDiscountedInvoices = await listTier2InvoicesForDiscountingInternal(
    invoiceToDiscount.tier2Invoice.tier1Id,
    invoiceToDiscount.tier2Invoice.tier2Id
  );
  const foundInvoices = allPossibleDiscountedInvoices.filter(
    (dInv) =>
      _.isEqual(dInv.tier2Invoice.invoiceId, invoiceToDiscount.tier2Invoice.invoiceId) && dInv.status === "Pending"
  );

  assert.ok(
    foundInvoices.length === 1 && foundInvoices[0].partAnchorInvoices.length === 1,
    "Invoice not found to discount"
  );
  assert.ok(foundInvoices[0].status === "Pending");
  const discount: DeepPartial<AnchorTier2InvoiceMapping> = {
    anchorId: foundInvoices[0].partAnchorInvoices[0].anchorInvoice.anchorId,
    tier1Id: foundInvoices[0].partAnchorInvoices[0].anchorInvoice.tier1Id,
    tier2Id: foundInvoices[0].tier2Invoice.tier2Id,
    anchorInvoiceId: foundInvoices[0].partAnchorInvoices[0].anchorInvoice.invoiceId,
    tier2InvoiceId: foundInvoices[0].tier2Invoice.invoiceId,
  };

  const retVal: AnchorTier2InvoiceMapping = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .save(discount);

  return res.json(retVal);
}
