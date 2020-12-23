import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actor } from "./Actor";

interface MappingData {
  interestRate: number;
  bufferDays: number;
}

@Index("actormappings_pkey", ["childId", "parentId"], { unique: true })
@Entity("actormappings", { schema: "public" })
export class ActorMappings {
  @Column("integer", { primary: true, name: "parentid" })
  parentId: number;

  @Column("integer", { primary: true, name: "childid" })
  childId: number;

  @Column("jsonb", { name: "mappingdata", nullable: true })
  mappingData: MappingData | null;

  @ManyToOne(() => Actor, (actor) => actor.actormappings, { eager: true })
  @JoinColumn([{ name: "childid", referencedColumnName: "actorid" }])
  child: Actor;

  @ManyToOne(() => Actor, (actor) => actor.actormappings2, { eager: true })
  @JoinColumn([{ name: "parentid", referencedColumnName: "actorid" }])
  parent: Actor;
}
