import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class trans {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 30})
    name: string;

    @Column({ default: 0 })
    summ: number;

    @Column({length: 20})
    date: string

    @Column({length: 255})
    description: string;

    @Column({length: 10})
    categoryType: string;

}