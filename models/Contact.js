var keystone = require('keystone');

/**
 * Service Model
 * =============
 */

var Contact = new keystone.List('Contact', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Contact.add({
	title: { type: String, required: true, default: 'Contact' },
	location: { type: String, default: 'Москва - Красногорск - Минск', required: true},
	email: { type: String, default: 'annabazenovskaya@mail.ru', required: true},
	phone: { type: String, default: '+7 916 242 93 42', required: true},
	whatsApp: { type: String, default: '+7 916 242 93 42', required: true},
	viber: { type: String, default: '+7 916 242 93 42', required: true}
});

/*Advice.defaultSort = '-createdAt';*/
//Advice.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Contact.register();
