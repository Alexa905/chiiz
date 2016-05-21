var keystone = require('keystone');
//var Service = keystone.list('Service');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	/*var locals = res.locals;
	locals.filters = {
		service: req.params.service
	};
	// Set locals
	locals.section = 'service';
	view.query('service', Service.model.find().where('state', 'published').where('pathName', locals.filters.service));*/
	view.render('service');
	
};
