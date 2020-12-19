import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "username", length: 50 })
  username: string;

  @Column("character varying", { name: "hash" })
  hash: string;

  @Column("jsonb", { name: "data", nullable: true })
  data: object | null;

  @Column("character varying", { name: "salt" })
  salt: string;
}
