import axios from 'axios';

export const fetchBooksAPI = async () => {
    const response = await axios.get(" http://localhost:8080/api/v1/books")
    return response.data
}
export const getAllBooks = () => {
    return axios.get('http://localhost:8080/api/v1/books');
};

export const addNewBook = (bookData) => {
    return axios.post('http://localhost:8080/api/v1/books', bookData);
};

export const deleteBookById = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/books/${id}`);
};

export const updateBookById = (id, updatedBookData) => {
    return axios.put(`http://localhost:8080/api/v1/books/${id}`, updatedBookData);
};
