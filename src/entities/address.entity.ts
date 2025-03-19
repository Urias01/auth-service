import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  street: string

  @Column({ type: 'varchar', length: 100 })
  city: string

  @Column({ type: 'varchar', length: 100 })
  state: string

  @Column({ type: 'varchar', length: 20 })
  postalCode: string

  @ManyToOne(() => User, (user) => user.addresses)
  user: User
}
