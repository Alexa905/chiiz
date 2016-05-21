var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * News Model
 * ==========
 */

var News = new keystone.List('News', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

News.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	images: { type: Types.CloudinaryImages, filenameAsPublicID : true, folder: 'news' },
	slug: { type: String },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

News.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

News.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
News.register();
