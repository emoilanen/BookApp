const { getAllBooks, saveNewBook } = require('../services/bookService');

const bookRouter = require('express').Router();

bookRouter.get('/', async (request, response) => {
	getAllBooks().then((res) => {
		if (res) {
			response.status(200).send(res);
		}
	})
});

bookRouter.post('/add_new', async (request, response) => {
	const data = request.body;

	saveNewBook(data).then((res => {
		if (res) {
			response.sendStatus(200);
		}
	}));
});

bookRouter.put('/update', async (request, response) => {
	const data = request.body;
	response.status(200).send('Kutsu päivittää kirja saapunut');
});

bookRouter.delete('/delete/:id', async (request, response) => {
	response.status(200).send('Kutsu poistaa kirja saapunut');
});


module.exports = bookRouter;
