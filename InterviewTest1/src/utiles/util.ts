import * as pl from 'nodejs-polars';
import mt from 'moment';
import { pool } from "./db.js"


/*
透過 polars套件進行數據缺補
*/
export function fillMissingMetrics(data: any, days: number) {
    let now = mt().utc().startOf('day');
    // 創建回傳所需完整天數日期資料
    let full_date: number[] = [];
    full_date.push(now.valueOf());
    for (let i = 0; i < days - 1; i++) {
        full_date.push(now.subtract(1, 'days').valueOf());
    }
    let full_date_df = pl.DataFrame({ full_date: full_date });
    full_date_df = full_date_df.withColumn(
        pl.col('full_date').cast(pl.Datetime('ms')).alias('full_datetime')
    );

    // 將input資料轉為DataFrame
    let o_df = pl.DataFrame(data);
    o_df = o_df.withColumns(
        pl.col("date").alias("full_date")
    );

    // 配對完整日期
    let m_df = full_date_df.join(o_df, { how: 'left', on: 'full_date' });

    // 排序
    m_df = m_df.sort("full_date");

    // 列出向前向後缺補資料
    m_df = m_df.withColumns(
        pl.col("date").forwardFill().alias("f_date"),
        pl.col("date").backwardFill().alias("b_date"),
        pl.col("averageLikesCount").forwardFill().alias("f_averageLikesCount"),
        pl.col("averageLikesCount").backwardFill().alias("b_averageLikesCount"),
        pl.col("followersCount").forwardFill().alias("f_followersCount"),
        pl.col("followersCount").backwardFill().alias("b_followersCount"),
        pl.col("averageEngagementRate").forwardFill().alias("f_averageEngagementRate"),
        pl.col("averageEngagementRate").backwardFill().alias("b_averageEngagementRate"),
    );

    // 列出向前向後缺補差異天數
    m_df = m_df.withColumns(
        pl.col("full_date").sub(pl.col("f_date")).abs().alias("f_diff"),
        pl.col("full_date").sub(pl.col("b_date")).abs().alias("b_diff")
    );

    // 缺補最近天數資料
    m_df = m_df.withColumns(
        pl.when(pl.col("f_diff").lt(pl.col("b_diff"))).then(pl.col("f_averageLikesCount")).otherwise(pl.col("b_averageLikesCount")).alias("averageLikesCount"),
        pl.when(pl.col("f_diff").lt(pl.col("b_diff"))).then(pl.col("f_followersCount")).otherwise(pl.col("b_followersCount")).alias("followersCount"),
        pl.when(pl.col("f_diff").lt(pl.col("b_diff"))).then(pl.col("f_averageEngagementRate")).otherwise(pl.col("b_averageEngagementRate")).alias("averageEngagementRate")
    );

    // 以較早資料缺補相同差異天數資料
    m_df = m_df.withColumns(
        pl.when(pl.col("f_diff").eq(pl.col("b_diff"))).then(pl.col("f_averageLikesCount")).otherwise(pl.col("averageLikesCount")).alias("averageLikesCount"),
        pl.when(pl.col("f_diff").eq(pl.col("b_diff"))).then(pl.col("f_followersCount")).otherwise(pl.col("followersCount")).alias("followersCount"),
        pl.when(pl.col("f_diff").eq(pl.col("b_diff"))).then(pl.col("f_averageEngagementRate")).otherwise(pl.col("averageEngagementRate")).alias("averageEngagementRate"),
    );

    // m_df.writeCSV('m_df.csv'); //除錯使用

    // 僅回傳相關欄位
    return m_df.select(pl.col("full_date").alias("date"), pl.col("full_datetime").alias("datetime"), pl.col("averageLikesCount"), pl.col("followersCount"), pl.col("averageEngagementRate")).toRecords();
}