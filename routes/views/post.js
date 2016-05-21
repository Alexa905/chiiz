var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'news';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		news: []
	};
	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('News').model.findOne({
			state: 'published',
			slug: locals.filters.post
		});
		
		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});
		
	});
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('News').model.find().where('state', 'published').sort('-publishedDate').limit('4');
		
		q.exec(function(err, results) {
			locals.data.news = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('post');
	
};
