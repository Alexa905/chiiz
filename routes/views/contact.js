var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	view.query('contacts', keystone.list('Contact').model.find());
	// Render the view
	view.render('contact');

};
