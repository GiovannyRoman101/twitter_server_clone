import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm'

@Entity()
class Tweet extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: number

	@Column()
	message!: string

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)'
	})
	postTime!: Date
}

export default Tweet
