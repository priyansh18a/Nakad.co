import { DineroObject } from "dinero.js";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";
import { PartAnchorInvoice } from "./DiscountedTier2Invoice";

export interface Tier2EntryAdjustment {
  tier2Entry: "Pending" | "Done";
  tier2Invoice: Tier2Invoice;
  partAnchorInvoices: PartAnchorInvoice;
  discountedAmount: DineroObject;
}
