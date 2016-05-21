var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'gallery';
	locals.data = {
		images: []
	};
	locals.filters = {
		gallery: req.params.name
	};


	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find().where('pathName', locals.filters.gallery));
	
	// Render the view
	view.render('gallery');
	
};
