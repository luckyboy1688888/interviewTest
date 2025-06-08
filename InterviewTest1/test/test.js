const shoulf = require("should");
const util = require("../src/utiles/util.ts")
const prepareData =  require("../src/utiles/prepareData.ts")

describe('#fillMissingMetrics', () => {
    // 測試算出來的平均是不是 2.5
    it('fillMissingMetrics should return 7Days data', done => {
      var res = util.fillMissingMetrics(prepareData.example1, 7)
      res.length.should.equal(7);
      done()
    })
  })