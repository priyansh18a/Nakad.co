import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { PartAnchorInvoice } from "./DiscountedTier2Invoice";

export interface Tier1PayableReceivable {
  tier2Invoice: Tier2Invoice;
  partAnchorInvoices: PartAnchorInvoice;
  discountedAmount: Dinero.Dinero;
}
