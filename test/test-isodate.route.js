var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    should = chai.should(),
    ISODateRoute = require('../server/routes/isodate.route'),
    ISODateService = require('../server/services/isodate.service'),
    APIs = require('./api.test.constant'),
    HOSTs = require('../server/constants/host.constant');

chai.use(chaiHttp);
describe('isodate.route', function () {
  describe('/GET isodate', function () {
    it('success with 200 & an object', function ( done ) {
      chai.request(HOSTs.ENV).get(APIs.GET_ISO_DATE).end(function (err, res) {
        res.body.wrapper.data.should.be.a('object');
        expect(res).to.have.status(200);
        done();
      })
    });
  })
});
