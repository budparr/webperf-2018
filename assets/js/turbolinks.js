if (process.env.NODE_ENV == 'production') {
	var Turbolinks = require('turbolinks');
	Turbolinks.start();
	console.log('Turbolinks is active');
}
