import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({
  name: 'util_record'
})
export default class UtilRecord {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer'
  })
  userId: number

  @Column({
    type: 'integer',
    nullable: true
  })
  groupId?: number

  @Column({
    type: 'varchar',
    length: 255
  })
  commandName: string

  @CreateDateColumn({
    type: 'datetime',
  })
  usedAt: Date
} 