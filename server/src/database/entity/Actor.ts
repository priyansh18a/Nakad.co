import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnchorDebitNotes } from "./AnchorDebitNotes";
import { AnchorTier2InvoiceMapping } from "./AnchorTier2InvoiceMapping";
import { Tier2Invoice } from "./Tier2Invoice";

@Index("books_pkey", ["actorid"], { unique: true })
@Entity("actor", { schema: "public" })
export class Actor {
  @PrimaryGeneratedColumn({ type: "integer", name: "actorid" })
  actorid: number;

  @Column("enum", {
    name: "actortype",
    enum: ["Tier1", "Tier2", "Bank", "Admin", "Anchor"],
  })
  actortype: "Tier1" | "Tier2" | "Bank" | "Admin" | "Anchor";

  @Column("jsonb", { name: "actorinfo", nullable: true })
  actorinfo: object | null;

  @OneToMany(() => AnchorDebitNotes, (anchorDebitNotes) => anchorDebitNotes.anchor)
  anchorDebitNotes: AnchorDebitNotes[];

  @OneToMany(() => AnchorDebitNotes, (anchorDebitNotes) => anchorDebitNotes.tier)
  anchorDebitNotes2: AnchorDebitNotes[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.anchor)
  anchorTier2InvoiceMappings: AnchorTier2InvoiceMapping[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.bank)
  anchorTier2InvoiceMappings2: AnchorTier2InvoiceMapping[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.tier)
  anchorTier2InvoiceMappings3: AnchorTier2InvoiceMapping[];

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.tier2)
  anchorTier2InvoiceMappings4: AnchorTier2InvoiceMapping[];

  @OneToMany(() => Tier2Invoice, (tier2Invoice) => tier2Invoice.tier)
  tier2Invoices: Tier2Invoice[];

  @OneToMany(() => Tier2Invoice, (tier2Invoice) => tier2Invoice.tier2)
  tier2Invoices2: Tier2Invoice[];
}
