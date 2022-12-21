import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Book } from '../../App';
import { useCallback, useState } from 'react';


export interface BookTableProps {
	books: Book[] | [];
	openForm: (book: Book) => void;
}

const BookTable = ({books, openForm}: BookTableProps) => {

	const handleOpenForm = useCallback((book: Book) => {
		openForm(book);
	},[openForm]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{backgroundColor: 'lightGray'}}>
            <TableCell sx={{fontWeight: 'bold'}}>Title</TableCell>
						<TableCell sx={{fontWeight: 'bold'}}>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { books &&
        	books.map(book => (
            <TableRow
              key={book.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            	onClick={()=> handleOpenForm(book) }
							style={{cursor: "pointer"}}
						>
							<TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BookTable;