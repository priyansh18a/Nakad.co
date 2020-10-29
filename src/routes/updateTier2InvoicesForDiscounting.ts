import assert from "assert";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { DiscountedTier2Invoice } from "./DiscountedTier2Invoice";
import { listTier2InvoicesForDiscountingInternal } from "./listTier2InvoicesForDiscounting";
import _ from "lodash";

// Request is a Tier2Invoice with status of Approved or Rejected
export async function updateTier2InvoicesForDiscounting(req: Request, res: Response): Promise<Response<any>> {
    const invoiceToDiscount: DiscountedTier2Invoice = req.body;
    const allPossibleDiscountedInvoices = await listTier2InvoicesForDiscountingInternal(invoiceToDiscount.tier2Invoice.tier1Id, invoiceToDiscount.tier2Invoice.tier2Id);

    const foundInvoices = allPossibleDiscountedInvoices.filter(dInv => _.isEqual(dInv.tier2Invoice, invoiceToDiscount.tier2Invoice) && _.isEqual(dInv.discountedAmount, invoiceToDiscount.discountedAmount) && dInv.status === "Pending");
    assert.ok(foundInvoices.length == 1, "Invoice not found to discount");
    assert.ok(invoiceToDiscount.status === "Discounted")
    return res.json({});
}
