import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ActorMappings } from "./ActorMappings";
import { AnchorDebitNotes } from "./AnchorDebitNotes";
import { AnchorInvoice } from "./AnchorInvoice";
import { AnchorTier2InvoiceMapping } from "./AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "./Tier2Invoice";

interface ActorInfo {
  name: string;
}

@Index("books_pkey", ["actorid"], { unique: true })
@Entity("actor", { schema: "public" })
export class Actor {
  @PrimaryGeneratedColumn({ type: "integer", name: "actorid" })
  actorid: number;

  @Column("enum", {
    name: "actortype",
    enum: ["Tier1", "Tier2", "Bank", "Admin", "Anchor"],
  })
  actorType: "Tier1" | "Tier2" | "Bank" | "Admin" | "Anchor";

  @Column("jsonb", { name: "actorinfo", nullable: true })
  actorInfo: ActorInfo | null;

  @Column("character varying", { name: "username", nullable: true, length: 50 })
  username: string | null;

  @Column("character varying", { name: "hash", nullable: true })
  hash: string | null;

  @Column("jsonb", { name: "data", nullable: true })
  data: object | null;

  @Column("character varying", { name: "salt", nullable: true })
  salt: string | null;

  @OneToMany(() => AnchorDebitNotes, (anchorDebitNotes) => anchorDebitNotes.anchor)
  anchorDebitNotes: AnchorDebitNotes[];

  @OneToMany(() => AnchorDebitNotes, (anchorDebitNotes) => anchorDebitNotes.tier1)
  anchorDebitNotes2: AnchorDebitNotes[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.anchor)
  anchorTier2InvoiceMappings: AnchorTier2InvoiceMapping[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.bank)
  anchorTier2InvoiceMappings2: AnchorTier2InvoiceMapping[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.tier1)
  anchorTier2InvoiceMappings3: AnchorTier2InvoiceMapping[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.tier2)
  anchorTier2InvoiceMappings4: AnchorTier2InvoiceMapping[];

  @OneToMany(() => Tier2Invoice, (tier2Invoice) => tier2Invoice.tier1)
  tier2Invoices: Tier2Invoice[];

  @OneToMany(() => Tier2Invoice, (tier2Invoice) => tier2Invoice.tier2)
  tier2Invoices2: Tier2Invoice[];

  @OneToMany(() => AnchorInvoice, (anchorinvoice) => anchorinvoice.anchor)
  anchorinvoices: AnchorInvoice[];

  @OneToMany(() => AnchorInvoice, (anchorinvoice) => anchorinvoice.tier1)
  anchorinvoices2: AnchorInvoice[];

  @OneToMany(() => ActorMappings, (actormappings) => actormappings.child)
  actormappings: ActorMappings[];

  @OneToMany(() => ActorMappings, (actormappings) => actormappings.parent)
  actormappings2: ActorMappings[];
}
