"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillMissingMetrics = fillMissingMetrics;
var pl = __importStar(require("nodejs-polars"));
var moment_1 = __importDefault(require("moment"));
function fillMissingMetrics(data, days) {
    var now = (0, moment_1.default)().utc().startOf('day');
    var full_date = [];
    full_date.push(now.valueOf());
    for (var i = 0; i < days - 1; i++) {
        full_date.push(now.subtract(1, 'days').valueOf());
    }
    var full_date_df = pl.DataFrame({ full_date: full_date });
    full_date_df = full_date_df.withColumn(pl.col('full_date').cast(pl.Datetime('ms')).alias('full_datetime'));
    var o_df = pl.DataFrame(data);
    o_df = o_df.withColumns(pl.col("date").alias("full_date"));
    var m_df = full_date_df.join(o_df, { how: 'left', on: 'full_date' });
    m_df = m_df.sort("full_date");
    m_df = m_df.withColumns(pl.col("date").forwardFill().alias("f_date"), pl.col("date").backwardFill().alias("b_date"), pl.col("averageLikesCount").forwardFill().alias("f_averageLikesCount"), pl.col("averageLikesCount").backwardFill().alias("b_averageLikesCount"), pl.col("followersCount").forwardFill().alias("f_followersCount"), pl.col("followersCount").backwardFill().alias("b_followersCount"), pl.col("averageEngagementRate").forwardFill().alias("f_averageEngagementRate"), pl.col("averageEngagementRate").backwardFill().alias("b_averageEngagementRate"));
    m_df = m_df.withColumns(pl.col("full_date").sub(pl.col("f_date")).abs().alias("f_diff"), pl.col("full_date").sub(pl.col("b_date")).abs().alias("b_diff"));
    m_df = m_df.withColumns(pl.when(pl.col("f_diff").lt(pl.col("b_diff"))).then(pl.col("f_averageLikesCount")).otherwise(pl.col("b_averageLikesCount")).alias("averageLikesCount"), pl.when(pl.col("f_diff").lt(pl.col("b_diff"))).then(pl.col("f_followersCount")).otherwise(pl.col("b_followersCount")).alias("followersCount"), pl.when(pl.col("f_diff").lt(pl.col("b_diff"))).then(pl.col("f_averageEngagementRate")).otherwise(pl.col("b_averageEngagementRate")).alias("averageEngagementRate"));
    m_df = m_df.withColumns(pl.when(pl.col("f_diff").eq(pl.col("b_diff"))).then(pl.col("f_averageLikesCount")).otherwise(pl.col("averageLikesCount")).alias("averageLikesCount"), pl.when(pl.col("f_diff").eq(pl.col("b_diff"))).then(pl.col("f_followersCount")).otherwise(pl.col("followersCount")).alias("followersCount"), pl.when(pl.col("f_diff").eq(pl.col("b_diff"))).then(pl.col("f_averageEngagementRate")).otherwise(pl.col("averageEngagementRate")).alias("averageEngagementRate"));
    // m_df.writeCSV('m_df.csv');
    return m_df.select(pl.col("full_date").alias("date"), pl.col("full_datetime").alias("datetime"), pl.col("averageLikesCount"), pl.col("followersCount"), pl.col("averageEngagementRate")).toRecords();
}
//# sourceMappingURL=util.js.map