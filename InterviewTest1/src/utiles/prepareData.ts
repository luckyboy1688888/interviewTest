
import mt from 'moment';
const now = mt();

function before_time(daysToSubtract:number) {
  const today = mt().utc().startOf('day');
  const sp_date = today.subtract(daysToSubtract, 'days');
  return sp_date.valueOf();
}

export const example1 = [
    {
      date: before_time(11),           // -11d
      averageLikesCount: 100,
      followersCount: 200,
      averageEngagementRate: 0.01
    },
    {
      date: before_time(9),           // -9d
      averageLikesCount: 105,
      followersCount: 202,
      averageEngagementRate: 0.012
    },
    {
      date: before_time(7),           // -7d
      averageLikesCount: 110,
      followersCount: 205,
      averageEngagementRate: 0.015
    },
    {
      date: before_time(6),           // -6d
      averageLikesCount: 120,
      followersCount: 208,
      averageEngagementRate: 0.02
    },
    {
      date: before_time(3),           // -3d
      averageLikesCount: 130,
      followersCount: 210,
      averageEngagementRate: 0.022
    },
    {
      date: before_time(2),           // -2d
      averageLikesCount: 140,
      followersCount: 215,
      averageEngagementRate: 0.023
    },
    {
      date: before_time(0),           // 0d
      averageLikesCount: 150,
      followersCount: 220,
      averageEngagementRate: 0.025
    },
  ];

export const example2 = [
    {
      date: before_time(5),           // -5d
      averageLikesCount: 120,
      followersCount: 208,
      averageEngagementRate: 0.02
    },
    {
      date: before_time(0),           // 0d
      averageLikesCount: 150,
      followersCount: 220,
      averageEngagementRate: 0.025
    },
  ];