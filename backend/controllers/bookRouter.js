const bookRouter = require('express').Router();

bookRouter.get('/', async (request, response) => {
 	response.header("Access-Control-Allow-Origin", "http://localhost:3000");
	response.status(200).send([{
		title: 'Testikirja',
		author: 'Kalle Kirjailija',
		description: 'Tämä on ensimmäinen testikirja'
	},
	{
		title: 'Toinen kirja',
		author: 'Kerttu Kirjailija',
		description: 'Tämä on toinen testikirja'
	}]);
});

module.exports = bookRouter;
