import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";
import { AnchorInvoice } from "./AnchorInvoice";

@Index("main", ["anchorId", "anchorInvoiceId", "tier1Id", "tier2Id", "tier2InvoiceId"], { unique: true })
@Entity("anchortier2invoicemapping", { schema: "public" })
export class AnchorTier2InvoiceMapping {
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

  @ManyToOne(() => Actor, (actor) => actor.anchorTier2InvoiceMappings)
  @JoinColumn([{ name: "AnchorId", referencedColumnName: "actorid" }])
  anchor: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchorTier2InvoiceMappings2)
  @JoinColumn([{ name: "Tier1Id", referencedColumnName: "actorid" }])
  tier: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchorTier2InvoiceMappings3)
  @JoinColumn([{ name: "Tier2Id", referencedColumnName: "actorid" }])
  tier2: Actor;

  @ManyToOne(() => AnchorInvoice, (anchorInvoice) => anchorInvoice.anchorTier2InvoiceMappings)
  @JoinColumn([
    { name: "AnchorInvoiceId", referencedColumnName: "invoiceId" },
    { name: "AnchorId", referencedColumnName: "anchorId" },
  ])
  anchorInvoice: AnchorInvoice;
}
