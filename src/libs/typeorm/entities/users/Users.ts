import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('increment')
  readonly id!: number

  @Column('varchar',{nullable:true})
  user_id!: string

  @Column('int',{nullable:true, default: 0 })
  reputation!: number
}