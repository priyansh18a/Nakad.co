import { Column, Entity, Index } from "typeorm";

@Index("Tier1Tier2BufferDays_pkey", ["tier1Id", "tier2Id"], { unique: true })
@Entity("tier1tier2bufferdays", { schema: "public" })
export class Tier1tier2bufferdays {
  @Column("integer", { primary: true, name: "Tier1Id" })
  tier1Id: number;

  @Column("integer", { primary: true, name: "Tier2Id" })
  tier2Id: number;

  @Column("interval", { name: "BufferDays" })
  bufferDays: any;
}
