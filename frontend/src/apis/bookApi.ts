import axios from "axios";
import { Book } from "../App";

const baseApiUrl = 'http://localhost:8080/api'


export const fetchAllBooks = async (): Promise<Book[]> => {
  return axios.get(`${ baseApiUrl }/books`).then((res) => {
    return (res.data);
  }).catch(err => {
    console.error('Error while fetching books', err);
  });
};

export const saveNewBook = async (newBook: Book): Promise<string> => {
  return axios.post(`${ baseApiUrl }/books/add_new`, newBook).then((res) => {
    return (res.data);
  }).catch(err => {
    console.error('Error while saving new book', err);
  });
};

export const updateBook = async (book: Book): Promise<Book[]> => {
  return axios.put(`${ baseApiUrl }/books/update`, book).then((res) => {
    return (res.data);
  }).catch(err => {
    console.error('Error while updating book', err);
  });
};

export const deleteBook = async (id: string): Promise<string> => {
  return axios.delete(`${ baseApiUrl }/books/delete/${id}`).then((res) => {
    return (res.data);
  }).catch(err => {
    console.error('Error while deleting book', err);
  });
};