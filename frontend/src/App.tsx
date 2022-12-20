import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Container from './components/layout/Container';
import BookTable from './components/bookTable/BookTable';
import BookForm from './components/bookForm/BookForm';

export interface Book {
  title: string;
  author: string;
  description: string;
}

const App = () => {
   const [ books, setBooks ] = useState<Book[] | []>([]);
  const baseApiUrl = 'http://localhost:8080/api'

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = useCallback(() => {
      axios.get(`${baseApiUrl}/books`).then((res) => {
      setBooks(res.data)
      }).catch(err => {
        console.error('Error while fetching books');
    });
  }, [setBooks]);

  return (
    <Container>
      <BookTable books={books}/>
      <BookForm />
    </Container>
  );
}

export default App;
