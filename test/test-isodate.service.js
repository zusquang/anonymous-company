var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    ISODateService = require('../server/services/isodate.service');

describe('isodate.service', function () {
  it('getISODate() should return err object with wrong offset input ', function () {
    var offset = 'agag';

    ISODateService.getISODate(offset, function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.be.an('undefined');
    });
  });

  it('getISODate() should return object with proper offset input ', function () {
    var offset = 1;

    ISODateService.getISODate(offset, function(err, data) {
      expect(err).to.be.null;
      data.should.be.a('object');
      expect(data).to.have.all.keys(['dt', 'tz']);
    });
  });
});
