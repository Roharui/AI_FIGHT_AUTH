import { Entity, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
import { Common } from "./common";

@Entity()
export class User extends Common {
  @Column({ length: 20 })
  user_id!: string;

  @Column()
  password!: string;

  @Column({ length: 20 })
  nickname!: string;

  @Column()
  isActive!: boolean;

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
