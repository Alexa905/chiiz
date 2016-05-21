/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');

/**
 Initialises the standard view locals

 The included layout depends on the navLinks array to generate
 the navigation in the header, you may wish to change this array
 or replace it with your own templates / logic.
 */

exports.initLocals = function (req, res, next) {

	var locals = res.locals;

	locals.navLinks = {

		advice: [
			{label: 'Где проводить фотосессию', key: 'adviceWhere', href: '/advice-where'},
			{label: 'Как подготовиться к съемке', key: 'adviceHow', href: '/advice-how'}
		],
		contact: {label: 'Контакты', key: 'contact', href: '/contact'},
		news: {label: 'Новости', key: 'news', href: '/news'},
		service: {label: 'Услуги', key: 'service', href: '/service'},
		portfolio: [
			{label: 'Младенцы', key: 'babies', href: '/portfolio-babies'},
			{label: 'Дети', key: 'kids', href: '/portfolio-kids'},
			{label: 'Ожидание', key: 'waiting', href: '/portfolio-waiting'},
			{label: 'Семья', key: 'family', href: '/portfolio-family'},
			{label: 'Взрослые', key: 'adults', href: '/portfolio-adults'},
			{label: 'Крещение', key: 'christening', href: '/portfolio-christening'}
		]
	};

	locals.Links = [
		{label: 'Услуги', key: 'service', href: '/service'},
		{label: 'Новости', key: 'news', href: '/news'}

	];

	locals.user = req.user;

	next();

}
;

/**
 Fetches and clears the flashMessages before a view is rendered
 */

exports.flashMessages = function (req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};

/**
 Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function (req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};
