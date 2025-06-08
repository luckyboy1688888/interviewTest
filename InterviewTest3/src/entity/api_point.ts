import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Index, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";


@Entity("apipoint_info") // API資訊表
export class ApiPointInfo {
    @PrimaryColumn({ type: "varchar", length: 255, comment: 'API名稱' })
    name: string;

    @Column({ comment: '花費點數' })
    point: number;

    @UpdateDateColumn({ comment: '寫入時間' })
    updatedAt: Date;
}


@Entity("user_info") // 使用者資料表
export class UserInfo {
    @PrimaryGeneratedColumn({ comment: '使用者uuID' })
    user_id: string;

    @Column({ type: "varchar", length: 64, comment: '姓名' })
    name: string;

    @Column({ type: "varchar", length: 32, comment: 'email' })
    mail: string;

    @Column({ type: "varchar", length: 16, comment: '電話' })
    phone: string;

    @Column({ type: "int", comment: '剩餘點數' })
    prepurchased_credit: number;

    @UpdateDateColumn({ comment: '寫入時間' })
    updatedAt: Date;
}



@Entity("user_point_hist") // 點數紀錄
export class UserPointHist {
    @PrimaryGeneratedColumn({ comment: '紀錄ID' })
    id: string;

    @OneToOne(() => UserInfo)
    @JoinColumn({ name: 'user_id' })
    user_id: UserInfo;

    @OneToOne(() => ApiPointInfo)
    @JoinColumn({ name: 'name' })
    api_name: ApiPointInfo;

    @Column({ type: "int", comment: '進出點數' })
    point: string;

    @Index()
    @UpdateDateColumn({ comment: '寫入時間' })
    updatedAt: Date;
}