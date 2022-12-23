const { getAllBooks, saveNewBook, deleteOneBook, updateBook } = require('../services/bookService');

const bookRouter = require('express').Router();

bookRouter.get('/', async (request, response) => {
	getAllBooks().then((res) => {
		if (res) {
			response.status(200).send(res);
		} else {
			response.sendStatus(404);
		}
	})
});

bookRouter.post('/add_new', async (request, response) => {
	const data = request.body;

	saveNewBook(data).then((res => {
		if (res) {
			response.sendStatus(201);
		}  else {
			response.sendStatus(500);
		}
	}));
});

bookRouter.put('/update', async (request, response) => {
	const data = request.body;
	updateBook(data).then((res)=> {
		if (res) {
			response.sendStatus(201);
		}  else {
			response.sendStatus(500);
		}
	});
});

bookRouter.delete('/delete/:id', async (request, response) => {
	const id = request.params.id;
	deleteOneBook(id).then((res)=> {
		if (res) {
			response.sendStatus(200);
		}  else {
			response.sendStatus(500);
		}
	});
});


module.exports = bookRouter;
