import { Book } from "../../App";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useCallback, useEffect, useState } from "react";
import { FormContainer } from "./FormContainer";
import Button from "./Button";
import styled from "@emotion/styled";
import { deleteBook, saveNewBook, updateBook } from "../../apis/bookApi";

const ButtonRow = styled.div`
	display: flex;
	direction: row;
	gap: 5px;
`;

export interface BookFormProps {
	book?: Book;
	fetchBooks: () => void;
}

enum InputField {
	AUTHOR = 'author',
	TITLE = 'title',
	DESCRIPTION = 'description'
}

enum ResponseStatus {
	OK = 'OK',
	CREATED = 'Created',
}

const BookForm = ({ book, fetchBooks }: BookFormProps) => {

	const [ currentBook, setCurrentBook ] = useState<Book>({ author: '', title: '', description: '' });
	const [ titleError, setTitleError ] = useState<boolean>(false);
	const [ authorError, setAuthorError ] = useState<boolean>(false);


	useEffect(() => {
		setCurrentBook({
			id: book?.id || '',
			author: book?.author || '',
			title: book?.title || '',
			description: book?.description || ''
		});
	}, [book]);

	const emptyBookForm = useCallback(() => {
		fetchBooks();
		setCurrentBook({ author: '', title: '', description: '' });
	}, [fetchBooks]);

	const validateForm = useCallback(() => {

		currentBook?.author.length < 2 ? setAuthorError(true): setAuthorError(false);
		currentBook?.title.length < 2 ? setTitleError(true): setTitleError(false);

		if (currentBook?.author.length < 2 ||
			currentBook?.title.length < 2) {
			return false;
		}
		return true;
	}, [currentBook?.author.length, currentBook?.title.length]);


	const handleEditFormField = useCallback((e: any, inputField: InputField) => {
		const inputValue = e.target.value;

		switch (inputField) {
			case InputField.AUTHOR:
				setCurrentBook({ ...currentBook, author: inputValue });
				authorError && setAuthorError(false);
				break;
			case InputField.TITLE:
				setCurrentBook({ ...currentBook, title: inputValue });
				titleError && setTitleError(false);
				break;
			case InputField.DESCRIPTION:
				setCurrentBook({ ...currentBook, description: inputValue });
				break;
			default:
				console.error('Invalid input type');
		}
	}, [authorError, currentBook, titleError]);


	const handleSaveNew = useCallback(async () => {
		if (!validateForm()) return;

		try {
			const response = await saveNewBook(currentBook);
			if (response === ResponseStatus.CREATED) {
				emptyBookForm();
			}
		} catch (err) {
			console.error('Error while saving new book', err);
		}
	}, [currentBook, emptyBookForm, validateForm]);


	const handleUpdate = useCallback(async () => {
		if (!validateForm()) return;

		try {
			const response = await updateBook(currentBook);
			if (response === ResponseStatus.CREATED) {
				emptyBookForm();
			}
		} catch (err) {
			console.error('Error while updating the book', err);
		}
	}, [currentBook, emptyBookForm, validateForm]);


	const handleDelete = useCallback(async () => {
		if (currentBook?.id) {
			try {
				const response = await deleteBook(currentBook?.id);
				if (response === ResponseStatus.OK) {
					emptyBookForm();
				}
			} catch (err) {
				console.error('Error while deleting the book', err);
			}
			return;
		}
		console.error('Book id is missing!');
	}, [currentBook?.id, emptyBookForm]);

	return <FormContainer>
		<FormControl>
			<InputLabel htmlFor="component-outlined">Title</InputLabel>
			<OutlinedInput
				label="Title"
				value={currentBook?.title || ''}
				onChange={(e) => handleEditFormField(e, InputField.TITLE)}
				error={titleError}
			/>
		</FormControl>

		<FormControl>
			<InputLabel htmlFor="component-outlined">Author</InputLabel>
			<OutlinedInput
				label="Author"
				value={currentBook?.author || ''}
				onChange={(e) => handleEditFormField(e, InputField.AUTHOR)}
				error={authorError}
			/>
		</FormControl>

		<FormControl>
			<InputLabel htmlFor="component-outlined">Description</InputLabel>
			<OutlinedInput
				multiline={true}
				minRows={8}
				value={currentBook?.description || ''}
				label="Description"
				onChange={(e) => handleEditFormField(e, InputField.DESCRIPTION)}
			/>
		</FormControl>

		<ButtonRow>
			<Button
				text={'Save new'}
				onClick={handleSaveNew}
				 />
			<Button
				text={'Save'}
				onClick={handleUpdate}
				disabled={currentBook.id ? false : true} />
			<Button
				text={'Delete'}
				onClick={handleDelete}
				color={'red'}
				disabled={currentBook.id ? false : true} />
		</ButtonRow>
	</FormContainer>
};

export default BookForm;