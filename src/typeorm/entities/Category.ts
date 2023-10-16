import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60 })
    name: string;

    @Column({ length: 60 })
    icon: string;

    @Column({ default: 0 })
    amount: number;

    @Column({ length: 30 })
    type: string;
}
