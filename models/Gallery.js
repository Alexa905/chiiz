var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */
	
	

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key'}
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	images: { type: Types.CloudinaryImages, folder: 'portfolio' },
	pathName: { type: String }
});

Gallery.register();
