import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";
import { Anchorinvoice } from "./Anchorinvoice";

@Index(
  "main",
  ["anchorId", "anchorInvoiceId", "tier1Id", "tier2Id", "tier2InvoiceId"],
  { unique: true }
)
@Entity("anchortier2invoicemapping", { schema: "public" })
export class Anchortier2invoicemapping {
  @Column("integer", { primary: true, name: "AnchorId" })
  anchorId: number;

  @Column("integer", { primary: true, name: "Tier1Id" })
  tier1Id: number;

  @Column("character varying", {
    primary: true,
    name: "AnchorInvoiceId",
    length: 50,
  })
  anchorInvoiceId: string;

  @Column("character varying", {
    primary: true,
    name: "Tier2InvoiceId",
    length: 50,
  })
  tier2InvoiceId: string;

  @Column("integer", { primary: true, name: "Tier2Id" })
  tier2Id: number;

  @Column("integer", { name: "BankId", nullable: true })
  bankId: number | null;

  @Column("enum", {
    name: "BankApprovalStatus",
    nullable: true,
    enum: ["Approved", "Rejected", "Pending"],
  })
  bankApprovalStatus: "Approved" | "Rejected" | "Pending" | null;

  @ManyToOne(() => Actor, (actor) => actor.anchortier2invoicemappings)
  @JoinColumn([{ name: "AnchorId", referencedColumnName: "actorid" }])
  anchor: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchortier2invoicemappings2)
  @JoinColumn([{ name: "Tier1Id", referencedColumnName: "actorid" }])
  tier: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchortier2invoicemappings3)
  @JoinColumn([{ name: "Tier2Id", referencedColumnName: "actorid" }])
  tier2: Actor;

  @ManyToOne(
    () => Anchorinvoice,
    (anchorinvoice) => anchorinvoice.anchortier2invoicemappings
  )
  @JoinColumn([
    { name: "AnchorInvoiceId", referencedColumnName: "invoiceId" },
    { name: "AnchorId", referencedColumnName: "anchorId" },
  ])
  anchorinvoice: Anchorinvoice;
}
