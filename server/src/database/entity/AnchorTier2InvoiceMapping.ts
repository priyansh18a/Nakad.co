import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";
import { AnchorInvoice } from "./AnchorInvoice";

@Index("main", ["anchorId", "anchorInvoiceId", "tier1Id", "tier2Id", "tier2InvoiceId"], {
  unique: true,
})
@Index("anchortier2invoicemapping_pk", ["anchorId", "anchorInvoiceId", "tier1Id", "tier2Id", "tier2InvoiceId"], {
  unique: true,
})
@Entity("anchortier2invoicemapping", { schema: "public" })
export class AnchorTier2InvoiceMapping {
  @Column("integer", { primary: true, name: "AnchorId", unique: true })
  anchorId: number;

  @Column("integer", { primary: true, name: "Tier1Id", unique: true })
  tier1Id: number;

  @Column("character varying", {
    primary: true,
    name: "AnchorInvoiceId",
    unique: true,
    length: 50,
  })
  anchorInvoiceId: string;

  @Column("character varying", {
    primary: true,
    name: "Tier2InvoiceId",
    unique: true,
    length: 50,
  })
  tier2InvoiceId: string;

  @Column("integer", { primary: true, name: "Tier2Id", unique: true })
  tier2Id: number;

  @Column("integer", { name: "BankId", nullable: true })
  bankId: number;

  @Column("enum", {
    name: "BankApprovalStatus",
    nullable: true,
    enum: ["Approved", "Rejected", "Pending"],
  })
  bankApprovalStatus: "Approved" | "Rejected" | "Pending" | null;

  @ManyToOne(() => Actor, (actor) => actor.anchorTier2InvoiceMappings)
  @JoinColumn([{ name: "AnchorId", referencedColumnName: "actorid" }])
  anchor: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchorTier2InvoiceMappings2)
  @JoinColumn([{ name: "BankId", referencedColumnName: "actorid" }])
  bank: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchorTier2InvoiceMappings3)
  @JoinColumn([{ name: "Tier1Id", referencedColumnName: "actorid" }])
  tier: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchorTier2InvoiceMappings4)
  @JoinColumn([{ name: "Tier2Id", referencedColumnName: "actorid" }])
  tier2: Actor;

  @ManyToOne(() => AnchorInvoice, (anchorInvoice) => anchorInvoice.anchorTier2InvoiceMappings)
  @JoinColumn([
    { name: "AnchorInvoiceId", referencedColumnName: "invoiceId" },
    { name: "AnchorId", referencedColumnName: "anchorId" },
  ])
  anchorInvoice: AnchorInvoice;
}
