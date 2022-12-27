const Book = require('../models/book')


 const getAllBooks = () => {
	 return new Promise((resolve, reject) => {
			  Book.find({})
			 .then((result)=>{
				if(result){
					resolve(result);
				} else {
					reject('Error while fetching books from database');
				}
			 })
	})
};

 const updateBook = (book) => {
	return new Promise((resolve, reject) => {
		if(book?.id){
			const data = {
				title: book?.title,
				author: book?.author,
				description: book?.description
			}
			Book.findByIdAndUpdate(book.id, data).then((res) => {
				if(res){
					resolve(true);
				} else {
					reject('Error while updating the book');
				}
			});
		}
	});
};

const saveNewBook = (book) => {
	return new Promise(async (resolve, reject) => {
		const newBook = new Book({
			title: book.title || '',
			author: book.author || '',
			description: book.description || ''
		});
			const savedBook = await newBook.save();
			if (savedBook) {
				resolve(true);
			} else {
				reject('Error while saving new book');
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