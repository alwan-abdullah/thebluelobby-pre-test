import { Column, CreateDateColumn, DeleteDateColumn, Entity, IntegerType, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 300})
  task: string;

  @Column({type: 'varchar', length: 300})
  desc: string;

  @Column({type: 'smallint', default: 0 })
  status: status;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
  
}
export enum status {
  ONGOING = '0',
  COMPLETED = '1'
}
