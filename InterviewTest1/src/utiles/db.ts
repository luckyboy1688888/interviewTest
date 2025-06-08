import { Pool } from 'pg';


export const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'interview_test',
    password: '1qazXSW@',
    port: 5432, // 確保埠號是數字
});

pool.connect().then(client => {
    console.log('DB connect OK');
    client.release(); // 釋放客戶端回連接池
}).catch(err => {
    console.error('DB connect fail !!!', err.stack);
    process.exit(1); // 連接失敗則退出應用程式
});

