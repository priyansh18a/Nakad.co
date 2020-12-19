import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Anchordebitnotes } from "./Anchordebitnotes";
import { Anchortier2invoicemapping } from "./Anchortier2invoicemapping";
import { Tier2invoice } from "./Tier2invoice";

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

  @OneToMany(
    () => Anchordebitnotes,
    (anchordebitnotes) => anchordebitnotes.anchor
  )
  anchordebitnotes: Anchordebitnotes[];

  @OneToMany(
    () => Anchordebitnotes,
    (anchordebitnotes) => anchordebitnotes.tier
  )
  anchordebitnotes2: Anchordebitnotes[];

  @OneToMany(
    () => Anchortier2invoicemapping,
    (anchortier2invoicemapping) => anchortier2invoicemapping.anchor
  )
  anchortier2invoicemappings: Anchortier2invoicemapping[];

  @OneToMany(
    () => Anchortier2invoicemapping,
    (anchortier2invoicemapping) => anchortier2invoicemapping.tier
  )
  anchortier2invoicemappings2: Anchortier2invoicemapping[];

  @OneToMany(
    () => Anchortier2invoicemapping,
    (anchortier2invoicemapping) => anchortier2invoicemapping.tier2
  )
  anchortier2invoicemappings3: Anchortier2invoicemapping[];

  @OneToMany(() => Tier2invoice, (tier2invoice) => tier2invoice.tier)
  tier2invoices: Tier2invoice[];

  @OneToMany(() => Tier2invoice, (tier2invoice) => tier2invoice.tier2)
  tier2invoices2: Tier2invoice[];
}
