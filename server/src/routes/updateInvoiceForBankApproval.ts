import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { AnchorTier2InvoiceMapping } from "../database/entity/AnchorTier2InvoiceMapping";

// Request is a AnchorTier2InvoiceMapping with bankApproval Status of Accepted or Rejected and bankId

export async function updateInvoiceForBankApproval(
  req: Request,
  res: Response
): Promise<Response<AnchorTier2InvoiceMapping>> {
  const request = req.body as AnchorTier2InvoiceMapping;

  await getConnection().getRepository(AnchorTier2InvoiceMapping).update(
    {
      anchorId: request.anchorId,
      tier2Id: request.tier2Id,
      tier2InvoiceId: request.tier2InvoiceId,
      bankId: null,
    },
    {
      bankId: request.bankId,
      bankApprovalStatus: request.bankApprovalStatus,
    }
  );
  const invoiceForApproval = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .findOne({
      where: {
        anchorId: request.anchorId,
        tier2Id: request.tier2Id,
        tier2InvoiceId: request.tier2InvoiceId,
        bankId: request.bankId,
      },
    });
  console.log(JSON.stringify(invoiceForApproval));
  console.log("BankId  and Bank Status updated");

  return res.json(invoiceForApproval);
}
