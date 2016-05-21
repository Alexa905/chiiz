var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'advice';
	locals.filters = {
		advice: req.params.advice
	};
	
	view.query('advices', keystone.list('Advice').model.find().where('state', 'published').where('pathName', locals.filters.advice));
	// Render the view
	view.render('advice');

};
