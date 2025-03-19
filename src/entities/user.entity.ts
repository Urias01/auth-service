import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './enums/user-role.enum'
import { Address } from './address.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string

  @Column({ type: 'varchar', length: 100 })
  password: string

  @Column({ type: 'varchar', length: 50, default: UserRole.CUSTOMER })
  role: UserRole

  @Column({ type: 'varchar', length: 100, nullable: true })
  phone?: string

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[]
}
