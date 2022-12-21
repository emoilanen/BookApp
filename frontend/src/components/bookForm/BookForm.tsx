import { Book } from "../../App";
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useCallback, useState } from "react";
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

const BookForm = ({book, fetchBooks}: BookFormProps) => {

	const [currentBook, setCurrentBook] = useState<Book>(book || {author: '', title: '', description: ''})

	const handleEditFormField = useCallback((e: any, inputField: InputField) => {
		const inputValue = e.target.value;

		switch (inputField) {
			case InputField.AUTHOR:
				setCurrentBook({...currentBook, author: inputValue});
				break;
			case InputField.TITLE:
				setCurrentBook({...currentBook, title: inputValue});
				break;
			case InputField.DESCRIPTION:
				setCurrentBook({...currentBook, description: inputValue});
				break;
			default:
				console.error('Invalid input type');
		}
	}, [currentBook]);

	const handleAddNew = useCallback(async () => {
		try {
			const response = await saveNewBook(currentBook);
			if (response === 'OK') {
				fetchBooks();
				setCurrentBook({author: '', title: '', description: ''});
			}
		} catch (err) {
			console.error('Error while saving new book', err);
		}
	}, [currentBook, fetchBooks]);

	const handleUpdate = useCallback(async () => {
		try {
			await updateBook(currentBook);
		} catch (err) {
			console.error('Error while saving new book', err);
		}
	}, [currentBook]);

	const handleDelete = useCallback(async () => {
		if (currentBook?.id) {
			try {
				await deleteBook(currentBook?.id);
			} catch (err) {
			console.error('Error while saving new book', err);
			}
			return;
		}
		console.error('Book id is missing!');
	}, [currentBook?.id]);

	return <FormContainer>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Title</InputLabel>
				<OutlinedInput
					label="Title"
				  value={ currentBook?.title || '' }
			   	onChange={(e)=> handleEditFormField(e, InputField.TITLE)}
				/>
      </FormControl>

			<FormControl>
        <InputLabel htmlFor="component-outlined">Author</InputLabel>
        <OutlinedInput
				  label="Author"
					value={ currentBook?.author || '' }
					onChange={(e)=> handleEditFormField(e, InputField.AUTHOR)}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="component-outlined">Description</InputLabel>
			  <OutlinedInput
				  multiline={ true }
				  minRows={ 8 }
				  value={currentBook?.description || ''}
					label="Description"
					onChange={(e)=> handleEditFormField(e, InputField.DESCRIPTION)}
         />
			</FormControl>

		  <ButtonRow>
			  <Button
					text={ 'Add new' }
					onClick={handleAddNew}/>
			  <Button
					text={ 'Save' }
					onClick={handleUpdate}/>
			  <Button
					text={'Delete'}
					onClick={handleDelete}
					color={'red'}/>
		  </ButtonRow>
	  </FormContainer>
};

export default BookForm;