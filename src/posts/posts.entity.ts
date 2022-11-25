import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  post_date: Date;

  @Column("varchar", { length: 300 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column("varchar", { length: 100 })
  category: string;
}
