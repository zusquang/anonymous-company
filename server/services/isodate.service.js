const VARs = require('../constants/var.constant');
const moment = require('moment');
const request = require('request');
const parser = require('xml2json');

ISODateService = function() {};

ISODateService.prototype.getISODate = function(offset, next) {
    if (isNaN(offset)) {
		return next(new Error('Offset was not a number'));
	}

    request(VARs.TIME_GOV_SOURCE, function(err, data) {
        if (err) {
            return next(new Error('Unable to fetch the data source', err));
        }

        var timeObj = JSON.parse(parser.toJson(data.body));
        var timeUtc = moment(timeObj.time).utc().utcOffset((offset * 60)).format(VARs.ISO_FORMAT);
        var result = {
            dt: timeUtc,
            tz: (offset > 0) ? VARs.ISO_TZ + '+' + offset : VARs.ISO_TZ + offset
        }

        next(null, result);
    });
}

module.exports = new ISODateService();