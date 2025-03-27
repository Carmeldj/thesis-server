import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', nullable: true, length: 20 })
    username: string;

    @Column({ type: 'varchar' })
    firstname: string;

    @Column({ type: 'varchar' })
    lastname: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    image: string;

    @Column({ type: 'varchar', nullable: true })
    role: string;

    @Column({ default: false, type: 'bool' })
    is_verified: boolean;

    @Column({ type: 'varchar' })
    phoneNumber?: string;
}
