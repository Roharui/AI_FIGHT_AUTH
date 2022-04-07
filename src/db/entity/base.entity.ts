import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true }) //unsigned when you need larger upper numeric range
  id!: number;

  @CreateDateColumn({ comment: "create date" })
  createdAt!: string;

  @UpdateDateColumn({ comment: "update date" })
  updatedAt!: string;
}
