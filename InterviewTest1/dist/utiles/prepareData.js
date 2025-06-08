"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.example2 = exports.example1 = void 0;
var moment_1 = __importDefault(require("moment"));
var now = (0, moment_1.default)();
function before_time(daysToSubtract) {
    var today = (0, moment_1.default)().utc().startOf('day');
    var sp_date = today.subtract(daysToSubtract, 'days');
    return sp_date.valueOf();
}
exports.example1 = [
    {
        date: before_time(11), // -11d
        averageLikesCount: 100,
        followersCount: 200,
        averageEngagementRate: 0.01
    },
    {
        date: before_time(9), // -9d
        averageLikesCount: 105,
        followersCount: 202,
        averageEngagementRate: 0.012
    },
    {
        date: before_time(7), // -7d
        averageLikesCount: 110,
        followersCount: 205,
        averageEngagementRate: 0.015
    },
    {
        date: before_time(6), // -6d
        averageLikesCount: 120,
        followersCount: 208,
        averageEngagementRate: 0.02
    },
    {
        date: before_time(3), // -3d
        averageLikesCount: 130,
        followersCount: 210,
        averageEngagementRate: 0.022
    },
    {
        date: before_time(2), // -2d
        averageLikesCount: 140,
        followersCount: 215,
        averageEngagementRate: 0.023
    },
    {
        date: before_time(0), // 0d
        averageLikesCount: 150,
        followersCount: 220,
        averageEngagementRate: 0.025
    },
];
exports.example2 = [
    {
        date: before_time(5), // -5d
        averageLikesCount: 120,
        followersCount: 208,
        averageEngagementRate: 0.02
    },
    {
        date: before_time(0), // 0d
        averageLikesCount: 150,
        followersCount: 220,
        averageEngagementRate: 0.025
    },
];
//# sourceMappingURL=prepareData.js.map