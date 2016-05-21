/*
var keystone = require('keystone');
var Types = keystone.Field.Types;

/!**
 * Service Model
 * =============
 *!/

var Service = new keystone.List('Service', {
	map: { name: 'title' },
	autokey: { path: 'pathName', from: 'title', unique: true }
});

Service.add({
	title: { type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	image: { type: Types.CloudinaryImage, filenameAsPublicID : true, folder: 'service' },
	pathName: { type: String},
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 600 }
	}
});

Service.schema.virtual('content.full').get(function() {
	return this.content.extended;
});

/!*Service.defaultSort = '-createdAt';*!/
//Service.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Service.register();
*/
