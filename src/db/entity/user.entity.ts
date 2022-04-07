import { Entity, Column, BeforeInsert } from "typeorm";
import { BaseEntity } from "./base.entity";
import { setHash } from "../../utils/bcrypt";

@Entity()
export class User extends BaseEntity {
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
    this.password = await setHash(password || this.password);
  }
}
