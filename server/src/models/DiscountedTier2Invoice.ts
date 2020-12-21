import { DineroObject } from "dinero.js";
import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

export interface PartAnchorInvoice {
  anchorInvoice: AnchorInvoice;
  partialAmount: DineroObject;
}

export interface DiscountedTier2Invoice {
  tier2Invoice: Tier2Invoice;
  partAnchorInvoices: PartAnchorInvoice[];
  discountedAmount: DineroObject;
  discountedAnnualRatePercentage: number;
  status: "Pending" | "Discounted";
}
