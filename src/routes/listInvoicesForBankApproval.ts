import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { AnchorTier2InvoiceMapping } from '../database/entity/AnchorTier2InvoiceMapping';

//Request has two query params - anchorId and tier2Id
export async function listInvoicesForBankApproval(req: Request, res: Response) {
  const anchorId = parseInt(req.query.anchorId[0]);
  const tier2Id = parseInt(req.query.tier2Id[0]);

  const allInvoices = await getConnection()
    .getRepository(AnchorTier2InvoiceMapping)
    .find({
      where: {
        anchorId: anchorId,
        tier2Id: tier2Id,
        bankApprovalStatus: 'Pending',
      },
    });

  return res.json(allInvoices);
}
