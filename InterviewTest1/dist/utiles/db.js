"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'interview_test',
    password: '1qazXSW@',
    port: 5432, // 確保埠號是數字
});
exports.pool.connect().then(function (client) {
    console.log('DB connect OK');
    client.release(); // 釋放客戶端回連接池
}).catch(function (err) {
    console.error('DB connect fail !!!', err.stack);
    process.exit(1); // 連接失敗則退出應用程式
});
//# sourceMappingURL=db.js.map