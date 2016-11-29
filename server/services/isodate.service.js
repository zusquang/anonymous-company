const VARs = require('../constants/var.constant');
const moment = require('moment');

ISODateService = function() {};

ISODateService.prototype.getISODate = function(offset, next) {
	if (isNaN(offset)) {
		return next(new Error('Not a number'));
	}

	var tz = VARs.ISO_TZ;
	var milliTzOffset = (60 * (-(offset))) * 60000; // millisecond timezone offset
    var isoOffsetTime = (new Date(Date.now() - milliTzOffset)).toISOString().slice(0,-5).replace("T", " ");
    var data = {
    	dt: moment(isoOffsetTime).format(VARs.ISO_FORMAT),
    	tz: (offset > 0) ? tz + '+' + offset : tz + offset
    }
    next(null, data);
}

module.exports = new ISODateService();