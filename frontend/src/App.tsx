/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import Container from './components/layout/Container';
import BookTable from './components/bookTable/BookTable';
import BookForm from './components/bookForm/BookForm';
import {fetchAllBooks} from './apis/bookApi';

export interface Book {
  id?: string;
  title: string;
  author: string;
  description: string;
}

const App = () => {
  const [ books, setBooks ] = useState<Book[] | []>([]);
  const [formOpen, setFormOpen] = useState<Boolean>(false);
  const [ editableBook, setEditableBook ] = useState<Book>();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      const allBooks = await fetchAllBooks();
      if (allBooks) {
        setBooks(allBooks);
      }
    } catch (error)  {
        console.error('Error while fetching books', error);
    }
  }, [setBooks]);

  const openForm = useCallback((book: Book) => {
    setFormOpen(() => !formOpen);
    setEditableBook(book);
  },[formOpen]);

  return (
    <Container>
      <BookForm book={ editableBook } fetchBooks={fetchBooks} />
      <BookTable books={ books } openForm={ openForm } />
    </Container>
  );
}

export default App;
