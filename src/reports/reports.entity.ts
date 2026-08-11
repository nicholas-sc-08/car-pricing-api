import { User } from "src/users/user.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    price!: number;

    @Column()
    make!: string

    @Column()
    model!: string;

    @Column()
    year!: number;

    @Column()
    lng!: string;

    @Column()
    lat!: number;

    @Column()
    mileage!: number;

    @ManyToOne(() => User, (user) => user.reports)
    user!: User;

    @AfterInsert()
    logInsert() {
        console.log(`Inserting car with id ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updating car with id ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removing car with id ${this.id}`);
    }
}