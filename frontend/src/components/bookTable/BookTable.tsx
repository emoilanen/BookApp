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
}

const BookTable = ({books}: BookTableProps) => {

	const [formOpen, setFormOpen] = useState<Boolean>(false);

	const openForm = useCallback((book: Book) => {
		setFormOpen((formOpen) => !formOpen);
	},[setFormOpen]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
						<TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { books &&
        	books.map(book => (
            <TableRow
              key={book.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            	onClick={()=> openForm(book) }
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