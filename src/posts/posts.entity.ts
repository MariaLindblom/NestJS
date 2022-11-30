import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  post_date: Date;

  @Column("varchar", { length: 300, default: "Title" })
  title: string;

  @Column({ type: 'varchar', default: "Content" })
  content: string;

  @Column("varchar", { length: 100 , default: "Category"})
  category: string;
}
