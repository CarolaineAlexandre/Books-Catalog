import { useEffect, useState } from 'react';
import './App.css';

interface Livro {
  _id: string;
  titulo: string;
  autor: string;
  isbn: string;
  paginas: number;
  ano: number;
  valor: number;
}

function App() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      await getAmount();
      await getLivros(currentPage);
    }
    fetchData();
  }, [currentPage]);

  async function getLivros(page: number) {
    try {
      const response = await fetch(`http://localhost:3001/livros/${page}`);
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
      } else {
        setLivros([]);
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  }

  async function getAmount() {
    try {
      const response = await fetch(`http://localhost:3001/len`);
      if (response.ok) {
        const data = await response.json();
        setAmount(data.amount);
        setPageTotal(Math.ceil(data.amount / 10));
      } else {
        setAmount(0);
      }
    } catch (error) {
      console.error("Erro ao contar documentos:", error);
    }
  }

  function handlePageChange(value: number) {
    setCurrentPage(value);
  }

  function renderPagination() {
    const pages = [];
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(pageTotal, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(1)}>{'<<'}</button>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>{'<'}</button>
        {pages}
        <button disabled={currentPage === pageTotal} onClick={() => handlePageChange(currentPage + 1)}>{'>'}</button>
        <button disabled={currentPage === pageTotal} onClick={() => handlePageChange(pageTotal)}>{'>>'}</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Catálogo de Livros</h1>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Páginas</th>
              <th>Ano</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro._id}>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.isbn}</td>
                <td>{livro.paginas}</td>
                <td>{livro.ano}</td>
                <td>R$ {livro.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {currentPage * 10 - 9} - {Math.min(currentPage * 10, amount)} de {amount} livros
        </div>
        {renderPagination()}
      </header>
    </div>
  );
}

export default App;
