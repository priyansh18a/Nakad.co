import { DineroObject } from "dinero.js";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { MoneyTransformer } from "../util/MoneyTransformer";
import { Actor } from "./Actor";
import { AnchorTier2InvoiceMapping } from "./AnchorTier2InvoiceMapping";

interface Tier2InvoiceDetails {
  data: Image[];
  remark: string;
  debitNotes: DebitNotes[];
}

interface Image {
  link: string;
}

interface DebitNotes {
  debitNoteNumber: string;
  debitNoteAmount: number;
  debitNoteFile: string;
}

@Index("tier2_unqiue", ["invoiceId", "tier1Id", "tier2Id"], { unique: true })
@Index("tier2invoice_pk", ["invoiceId", "tier1Id", "tier2Id"], { unique: true })
@Entity("tier2invoice", { schema: "public" })
export class Tier2Invoice {
  @Column("integer", { primary: true, name: "Tier2Id", unique: true })
  tier2Id: number;
  @Column("integer", { primary: true, name: "Tier1Id", unique: true })
  tier1Id: number;

  @Column("character varying", {
    primary: true,
    name: "InvoiceId",
    unique: true,
    length: 50,
  })
  invoiceId: string;

  @Column("bigint", {
    name: "InvoiceAmount",
    nullable: true,
    transformer: new MoneyTransformer(),
  })
  invoiceAmount: DineroObject | null;

  @Column("jsonb", {
    name: "Tier2InvoiceDetails",
    nullable: true,
  })
  tier2InvoiceDetails: Tier2InvoiceDetails | null;

  @Column("timestamp with time zone", { name: "InvoiceDate", nullable: true })
  invoiceDate: Date | null;

  @Column("timestamp with time zone", { name: "DueDate", nullable: true })
  dueDate: Date | null;

  @Column("timestamp with time zone", {
    name: "CreationTimestamp",
    nullable: true,
  })
  creationTimestamp: Date | null;

  @Column("timestamp with time zone", {
    name: "LastUpdateTimestamp",
    nullable: true,
  })
  lastUpdateTimestamp: Date | null;

  @Column("varchar", { name: "GRNId", nullable: true, array: true })
  grnId: string[] | null;

  @Column("enum", {
    name: "ApprovalStatus",
    nullable: true,
    enum: ["Approved", "Rejected", "Pending"],
  })
  approvalStatus: "Approved" | "Rejected" | "Pending" | null;

  @Column("bigint", {
    name: "ReceivableAmount",
    nullable: true,
    transformer: new MoneyTransformer(),
  })
  receivableAmount: DineroObject | null;

  @ManyToOne(() => Actor, (actor) => actor.tier2Invoices, { eager: true })
  @JoinColumn([{ name: "Tier1Id", referencedColumnName: "actorid" }])
  tier1: Actor;

  @ManyToOne(() => Actor, (actor) => actor.tier2Invoices2, { eager: true })
  @JoinColumn([{ name: "Tier2Id", referencedColumnName: "actorid" }])
  tier2: Actor;

  @OneToMany(() => AnchorTier2InvoiceMapping, (anchorTier2InvoiceMapping) => anchorTier2InvoiceMapping.tier2Invoice)
  anchorTier2InvoiceMappings: AnchorTier2InvoiceMapping[];
}
