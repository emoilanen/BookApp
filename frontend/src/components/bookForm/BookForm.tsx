import { Book } from "../../App";
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useCallback, useState } from "react";
import { FormContainer } from "./FormContainer";
import Button from "./Button";
import styled from "@emotion/styled";

const ButtonRow = styled.div`
	display: flex;
	direction: row;
	gap: 5px;
`;

export interface BookFormProps {
	book?: Book;
}

enum InputField {
	AUTHOR = 'author',
	TITLE = 'title',
	DESCRIPTION = 'description'
}

const BookForm = ({book}: BookFormProps) => {

	const [ author, setAuthor ] = useState<String>(book?.author || '');
	const [ title, setTitle ] = useState<String>(book?.title || '');
	const [ description, setDescription ] = useState<String>(book?.description || '');


	const handleEditFormField = useCallback((e: any, inputField: InputField) => {
		const inputValue = e.target.value;

		switch (inputField) {
			case InputField.AUTHOR:
				setAuthor(inputValue);
				break;
			case InputField.TITLE:
				setTitle(inputValue);
				break;
			case InputField.DESCRIPTION:
				setDescription(inputValue);
				break;
			default:
				console.error('Invalid input type');
		}
	}, []);

	const handleAddNew = useCallback(() => {
		console.log('Add new clicked!');
	}, []);

	const handleAdd = useCallback(() => {
		console.log('Add clicked!');
	}, []);

	const handleDelete = useCallback(() => {
		console.log('Delete clicked!');
	}, []);

	return <FormContainer>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Title</InputLabel>
				<OutlinedInput
					label="Title"
				  value={ title || '' }
			   	onChange={(e)=> handleEditFormField(e, InputField.TITLE)}
				/>
      </FormControl>

			<FormControl>
        <InputLabel htmlFor="component-outlined">Author</InputLabel>
        <OutlinedInput
				  label="Author"
					value={ author || '' }
					onChange={(e)=> handleEditFormField(e, InputField.AUTHOR)}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="component-outlined">Description</InputLabel>
			  <OutlinedInput
				  multiline={ true }
				  minRows={ 8 }
				  value={description || ''}
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
					onClick={handleAdd}/>
			  <Button
					text={'Delete'}
					onClick={handleDelete}
					color={'red'}/>
		  </ButtonRow>
	  </FormContainer>
};

export default BookForm;