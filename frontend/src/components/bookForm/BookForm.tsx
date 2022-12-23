import { Book } from "../../App";
import * as React from 'react';
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

const BookForm = ({book, fetchBooks}: BookFormProps) => {

	const [currentBook, setCurrentBook] = useState<Book>({author: '', title: '', description: ''})

	useEffect(()=>{
		setCurrentBook({
			id: book?.id || '',
			author: book?.author || '',
			title: book?.title || '',
			description: book?.description || ''
		});
	},[book]);

	const emptyBookForm = useCallback(()=> {
		fetchBooks();
		setCurrentBook({author: '', title: '', description: ''});
	},[fetchBooks]);


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
				emptyBookForm();
			}
		} catch (err) {
			console.error('Error while saving new book', err);
		}
	}, [currentBook, emptyBookForm]);


	const handleUpdate = useCallback(async () => {
		try {
			const response = await updateBook(currentBook);
			if (response === 'OK') {
				emptyBookForm();
			}
		} catch (err) {
			console.error('Error while updating the book', err);
		}
	}, [currentBook, emptyBookForm]);


	const handleDelete = useCallback(async () => {
		if (currentBook?.id) {
			try {
				const response = await deleteBook(currentBook?.id);
				if (response === 'OK') {
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
					onClick={handleAddNew}
					disabled={currentBook.id ? true : false}/>
			  <Button
					text={ 'Save' }
					onClick={handleUpdate}
					disabled={currentBook.id ? false : true}/>
			  <Button
					text={'Delete'}
					onClick={handleDelete}
					color={'red'}
					disabled={currentBook.id ? false : true}/>
		  </ButtonRow>
	  </FormContainer>
};

export default BookForm;