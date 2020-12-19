import { Column, Entity, Index, OneToMany } from "typeorm";
import { Anchortier2invoicemapping } from "./Anchortier2invoicemapping";

@Index("AnchorInvoice_AnchorId_InvoiceId_key", ["anchorId", "invoiceId"], {
  unique: true,
})
@Index("anchorinvoice_primary", ["anchorId", "invoiceId", "tier1Id"], {
  unique: true,
})
@Entity("anchorinvoice", { schema: "public" })
export class Anchorinvoice {
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

  @Column("bigint", { name: "InvoiceAmount", nullable: true })
  invoiceAmount: string | null;

  @Column("integer", { primary: true, name: "AnchorId", unique: true })
  anchorId: number;

  @Column("date", { name: "DueDate", nullable: true })
  dueDate: string | null;

  @OneToMany(
    () => Anchortier2invoicemapping,
    (anchortier2invoicemapping) => anchortier2invoicemapping.anchorinvoice
  )
  anchortier2invoicemappings: Anchortier2invoicemapping[];
}
