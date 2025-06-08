import chai from 'chai'
import {fillMissingMetrics} from "../src/utiles/util"
import {example1, example2} from "../src/utiles/prepareData"

const expect = chai.expect
describe('#fillMissingMetrics', () => {
    it('fillMissingMetrics should return 7Days data', done => {
      var res = fillMissingMetrics(example1, 7)
      let data_len = res.length;
      expect(data_len).equal(7);
      done()
    })
  })