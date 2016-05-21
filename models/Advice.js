var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Service Model
 * =============
 */

var Advice = new keystone.List('Advice', {
	map: { name: 'title' },
	autokey: { path: 'pathName', from: 'title', unique: true }
});

Advice.add({
	title: { type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	images: { type: Types.CloudinaryImages, filenameAsPublicID : true, folder: 'advices' },
	pathName: { type: String},
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 600 }
	}
});

Advice.schema.virtual('content.full').get(function() {
	return this.content.extended;
});

/*Advice.defaultSort = '-createdAt';*/
//Advice.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Advice.register();
