import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm'

@Entity()
export class Tweet extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	message!: string

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	postTime!: Date
}
