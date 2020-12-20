import assert from "assert";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

// For Both Approval and Rejection this invoice wil be used
// Request is a Tier2Invoice with status of Approved or Rejected
export async function updateTier2InvoiceForApproval(req: Request, res: Response): Promise<Response<Tier2Invoice>> {
  console.log("TIER2Invoice" + JSON.stringify(req.body));
  const request = req.body as Tier2Invoice;
  console.log(request);
  const tier2Invoice = await getConnection()
    .getRepository(Tier2Invoice)
    .findOne({
      where: {
        tier1Id: request.tier1Id,
        tier2Id: request.tier2Id,
        invoiceId: request.invoiceId,
      },
    });
   
  // Enable these in prod.
  // assert.ok(tier2Invoice.approvalStatus === "Pending", "Invoice not in pending state");
  // assert.ok(request.approvalStatus === "Approved" || request.approvalStatus === "Rejected", "Not a valid status to update for invoice");
  if(tier2Invoice.tier2InvoiceDetails) tier2Invoice.tier2InvoiceDetails.remark = request.tier2InvoiceDetails.remark;
  tier2Invoice.approvalStatus = request.approvalStatus;
  tier2Invoice.lastUpdateTimestamp = new Date();;
  await getConnection().getRepository(Tier2Invoice).save(tier2Invoice);
  console.log("saved");
  return res.json(tier2Invoice);
}
