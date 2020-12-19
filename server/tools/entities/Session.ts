import { Column, Entity, Index } from "typeorm";

@Index("IDX_session_expire", ["expire"], {})
@Index("session_pkey", ["sid"], { unique: true })
@Entity("session", { schema: "public" })
export class Session {
  @Column("character varying", { primary: true, name: "sid" })
  sid: string;

  @Column("json", { name: "sess" })
  sess: object;

  @Column("timestamp without time zone", { name: "expire" })
  expire: Date;
}
