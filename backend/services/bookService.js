const Book = require('../models/book')


 const getAllBooks = () => {
	 return new Promise(async (resolve, reject) => {
		 try {
			 const books = await Book.find({});
			 resolve(books);
		 } catch (e) {
			 reject();
		}
	});
};

 const updateBook = () => {
	return new Promise((resolve, reject) => {

	});
};

const saveNewBook = (book) => {
	return new Promise(async (resolve, reject) => {
		const newBook = new Book({
			title: book.title || '',
			author: book.author || '',
			description: book.description || ''
		});
		try {
			const savedBook = await newBook.save();
			if (savedBook) {
				resolve(true);
			}
				reject('Error while saving new book');
		} catch (err) {
			console.error('Error while saving new book', err);
		}
	});
};

 const deleteOneBook = (id) => {
	return new Promise(async (resolve, reject) => {
		try{
			await Book.findByIdAndDelete(id);
			resolve(true);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports = {
	getAllBooks,
	updateBook,
	saveNewBook,
	deleteOneBook
}