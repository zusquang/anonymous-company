var LOGGER = require('log4js').getLogger('anonymous-company'),
	APIs = require('../constants/api.constant'),
	isoDateService = require('../services/isodate.service');

function _responseSuccess ( data, res ) {
	res.send({
		success: true,
	    wrapper : {
	    	data : data
	    }
	});
}

function _responseFailure ( msg, res ) {
	res.send({
		success: false,
	    wrapper : {
	    	message: msg
	    }
	});
}

module.exports = function(app) {
	// api ---------------------------------------------------------------------
	app.get(APIs.GET_ISO_DATE, function( req, res ) {
		var offset = parseInt(req.params.offset);
		isoDateService.getISODate(offset, function(err, data) {
			if (err) {
				_responseFailure('Get isodate failure, try again', res);
			}
			_responseSuccess(data, res);
		});
	});
};