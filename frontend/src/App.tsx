import { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  _id: string;
  titulo: string;
  autor: string;
  isbn: string;
  paginas: number;
  ano: number;
  valor: number;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/catalogoLivros`, {
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        });
        console.log(response);
        if (response.status !== 200) {
          throw new Error('Erro ao carregar os livros');
        }
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao carregar os livros:', error);
      }
    }

    fetchBooks();
  }, [pageNumber, pageSize]);

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book._id} className="book-item">
          <h3>{book.titulo}</h3>
          <p>Autor: {book.autor}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Páginas: {book.paginas}</p>
          <p>Ano: {book.ano}</p>
          <p>Valor: {book.valor}</p>
        </div>
      ))}
      <div className="pagination">
        <button onClick={() => setPageNumber(prevPage => prevPage - 1)}>Anterior</button>
        <span>{pageNumber}</span>
        <button onClick={() => setPageNumber(prevPage => prevPage + 1)}>Próxima</button>
      </div>
    </div>
  );
}

export default BookList;
