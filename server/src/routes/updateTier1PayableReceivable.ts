import assert from "assert";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";

// For Both Approval and Rejection this invoice wil be used
// Request is a Tier2Invoice with status of Approved or Rejected
export async function updateTier1PayableReceivable(
  req: Request,
  res: Response
): Promise<Response<AnchorTier2InvoiceMapping>> {
  const request = req.body;
  console.log(request);
  const anchorTier2InvoiceMapping = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .findOne({
      where: {
        anchorInvoiceId: request.anchorInvoiceId,
        tier2InvoiceId: request.tier2InvoiceId,
      },
    });
  if (request.tier1ReceivableEntry === "Nochange")
    anchorTier2InvoiceMapping.tier1PayableEntry = request.tier1PayableEntry;
  if (request.tier1PayableEntry === "Nochange")
    anchorTier2InvoiceMapping.tier1ReceivableEntry = request.tier1ReceivableEntry;
  await getConnection().getRepository(AnchorTier2InvoiceMapping).save(anchorTier2InvoiceMapping);
  console.log("saved");
  return res.json(anchorTier2InvoiceMapping);
}
