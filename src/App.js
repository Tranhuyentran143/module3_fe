import './App.css';
import { useEffect, useRef, useState } from 'react';
import { addNewBook, deleteBookById, fetchBooksAPI, updateBookById } from './api/book.api';
import ItemBook from './components/bookList';

function App() {
  const idRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const create_atRef = useRef();
  const updated_atRef = useRef();


  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    const res = await fetchBooksAPI();
    setBooks(res);
  }

  useEffect(() => {
    fetchBooks()
  }, []);

  const createBook = async () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const book = {
      name,
      description,
      price,
    }
    await addNewBook(book)
    fetchBooks()
  }
  const onClickEditBook = (newBook) => {
    const { id,
      name,
      description,
      price
    } = newBook

    idRef.current = id
    nameRef.current.value = name
    priceRef.current.value = price
    descriptionRef.current.value = description
  }
  const updateBook = async () => {
    const newBook = {
      id: idRef.current,
      name: nameRef.current.value,
      price: priceRef.current.value,
      create_at: create_atRef.current.value,
      updated_at: updated_atRef.current.value
    }
    await updateBookById(newBook.id, newBook)
    fetchBooks()
  }
  const deleteBook = async (id) => {
    await deleteBookById(id)
    fetchBooks()
  }

  return (
    <div className='listBook'>
      <div >
        <label for="nameBook">Name</label><br />
        <input type="text" id="nameBook" name="nameBook" ref={nameRef} /><br />
        <label for="description">Description</label><br />
        <input type="text" id="description" name="description" ref={descriptionRef} /><br />
        <label for="price">Price</label><br />
        <input type="number" id="price" name="price" ref={priceRef} /><br />
        <input type='submit' onClick={createBook} value={"Create Book"} />
        <input type='submit' onClick={updateBook} value={"Edit Book"} />
      </div>
      <table className='table'>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Create_at</th>
          <th>Updated_at</th>
        </tr>
        {books.map((newBook, index) => (
          <ItemBook index={index} book={newBook} deleteBook={deleteBook} updateBook={onClickEditBook} />
        ))}
      </table>
    </div>
  );
}

export default App;
