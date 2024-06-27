import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import SearchBook from './components/SearchBook';

function App() {
  const [books, setBooks] = useState([]);
  const handleSearch = (keyword) => {
    const filteredBooks = books.filter(book =>
      book.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setBooks(filteredBooks);
    console.log(filteredBooks);
  }

  return (
    <Router>
      <div>
        <header>
          <h1>Book Store</h1>
          <nav>
            <a href="/add-books">Add new book</a>
            <div className="col">
              <SearchBook search={handleSearch} />
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/books" element={<BookList books={books} />} />
          <Route path="/add-books" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
