import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number | undefined;
  @Column('varchar')
  title: string | undefined;
  @Column('text')
  content: string | undefined;

  constructor(attributes: Partial<Post>) {
    Object.assign(this, attributes)
  }

}
