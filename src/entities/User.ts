import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm'

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: number

	@Column({ type: 'varchar', unique: true })
	username!: string

	@Column({ type: 'varchar', unique: true })
	email!: string

	@ManyToMany(() => User)
	@JoinTable()
	following!: User[]

	@Column()
	password!: string
}

export default User
