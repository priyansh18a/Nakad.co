import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";

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

  @Column("bigint", { name: "InvoiceAmount", nullable: true })
  invoiceAmount: string | null;

  @Column("timestamp with time zone", { name: "InvoiceDate", nullable: true })
  invoiceDate: Date | null;

  @Column("timestamp with time zone", { name: "DueDate", nullable: true })
  dueDate: Date | null;

  @Column("varchar", { name: "GRNId", nullable: true, array: true })
  grnId: string[] | null;

  @Column("enum", {
    name: "ApprovalStatus",
    nullable: true,
    enum: ["Approved", "Rejected", "Pending"],
  })
  approvalStatus: "Approved" | "Rejected" | "Pending" | null;

  @Column("bigint", { name: "ReceivableAmount", nullable: true })
  receivableAmount: string | null;

  @ManyToOne(() => Actor, (actor) => actor.tier2Invoices)
  @JoinColumn([{ name: "Tier1Id", referencedColumnName: "actorid" }])
  tier: Actor;

  @ManyToOne(() => Actor, (actor) => actor.tier2Invoices2)
  @JoinColumn([{ name: "Tier2Id", referencedColumnName: "actorid" }])
  tier2: Actor;
}
