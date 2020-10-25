import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";

@Index(
  "anchorDebitNotes_pk",
  ["anchorId", "debitNoteId", "invoiceId", "tier1Id"],
  { unique: true }
)
@Entity("AnchorDebitNotes", { schema: "public" })
export class AnchorDebitNotes {
  @Column("integer", { primary: true, name: "AnchorId" })
  anchorId: number;

  @Column("integer", { primary: true, name: "Tier1Id" })
  tier1Id: number;

  @Column("character varying", {
    primary: true,
    name: "DebitNoteId",
    length: 50,
  })
  debitNoteId: string;

  @Column("bigint", { name: "DebitAmount", nullable: true })
  debitAmount: string | null;

  @Column("timestamp with time zone", { name: "DebitNoteDate", nullable: true })
  debitNoteDate: Date | null;

  @Column("character varying", { primary: true, name: "InvoiceId", length: 50 })
  invoiceId: string;

  @ManyToOne(() => Actor, (actor) => actor.anchorDebitNotes)
  @JoinColumn([{ name: "AnchorId", referencedColumnName: "actorid" }])
  anchor: Actor;

  @ManyToOne(() => Actor, (actor) => actor.anchorDebitNotes2)
  @JoinColumn([{ name: "Tier1Id", referencedColumnName: "actorid" }])
  tier: Actor;
}
