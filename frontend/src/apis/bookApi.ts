import axios from "axios";
import { Book } from "../App";

const baseApiUrl = 'http://localhost:8080/api'


export const fetchAllBooks = async(): Promise<Book[]> => {
	return axios.get(`${ baseApiUrl }/books`).then((res) => {
      return (res.data);
    }).catch(err => {
      console.error('Error while fetching books', err);
    });
}
