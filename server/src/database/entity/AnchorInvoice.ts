import { DineroObject } from "dinero.js";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { MoneyTransformer } from "../util/MoneyTransformer";
import { AnchorTier2InvoiceMapping } from "./AnchorTier2InvoiceMapping";

@Index("anchorinvoice_primary", ["anchorId", "invoiceId", "tier1Id"], {
  unique: true,
})
@Index("AnchorInvoice_AnchorId_InvoiceId_key", ["anchorId", "invoiceId"], {
  unique: true,
})
@Entity("anchorinvoice", { schema: "public" })
export class AnchorInvoice {
  @Column("integer", { primary: true, name: "Tier1Id" })
  tier1Id: number;

  @Column("character varying", {
    primary: true,
    name: "InvoiceId",
    unique: true,
    length: 50,
  })
  invoiceId: string;

  @Column("timestamp with time zone", { name: "InvoiceDate", nullable: true })
  invoiceDate: Date | null;

  @Column("bigint", { name: "InvoiceAmount", nullable: true, transformer: new MoneyTransformer() })
  invoiceAmount: DineroObject | null;

  @Column("integer", { primary: true, name: "AnchorId", unique: true })
  anchorId: number;

  @Column("timestamp with time zone", { name: "DueDate", nullable: true })
  dueDate: Date | null;

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.anchorInvoice)
  anchorTier2InvoiceMappings: AnchorTier2InvoiceMapping[];
}
