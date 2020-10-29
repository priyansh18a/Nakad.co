import { AnchorInvoice } from "../database/entity/AnchorInvoice";
import { Tier2Invoice } from "../database/entity/Tier2Invoice";

export interface PartAnchorInvoice {
    anchorInvoice: AnchorInvoice;
    partialAmount: Dinero.Dinero;
}

export interface DiscountedTier2Invoice {
    tier2Invoice: Tier2Invoice;
    partAnchorInvoices: PartAnchorInvoice[];
    discountedAmount: Dinero.Dinero;
    discountedAnnualRatePercentage: Number;
    status: "Pending" | "Discounted";
}
