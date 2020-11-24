import { Column, Entity, Index } from "typeorm";

@Index("anchorgrn_pk", ["anchorId", "grnId", "invoiceId", "tier1Id"], {
  unique: true,
})
@Entity("AnchorGRN", { schema: "public" })
export class AnchorGrn {
  @Column("integer", { primary: true, name: "AnchorId" })
  anchorId: number;

  @Column("integer", { primary: true, name: "Tier1Id" })
  tier1Id: number;

  @Column("character varying", { primary: true, name: "GRNId", length: 50 })
  grnId: string;

  @Column("character varying", { primary: true, name: "InvoiceId", length: 50 })
  invoiceId: string;

  @Column("timestamp with time zone", { name: "GRNDate", nullable: true })
  grnDate: Date | null;
}
