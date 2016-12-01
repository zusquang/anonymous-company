const VARs = require('../constants/var.constant');
const moment = require('moment');
const request = require('request');

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

        next(null, timeUtc);
    });
}

module.exports = new ISODateService();