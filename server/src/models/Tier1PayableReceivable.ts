import { DineroObject } from "dinero.js";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { PartAnchorInvoice } from "./DiscountedTier2Invoice";

export interface Tier1PayableReceivable {
  tier1PayableEntry: "Pending" | "Done";
  tier1ReceivableEntry: "Pending" | "Done";
  tier2Invoice: Tier2Invoice;
  partAnchorInvoices: PartAnchorInvoice;
  discountedAmount: DineroObject;
}
