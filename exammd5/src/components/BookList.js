import React, { useState, useEffect } from 'react';
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3001/books?_expand=type')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Kiểm tra dữ liệu trả về
        if (Array.isArray(data)) {
          const sortedBooks = data.sort((a, b) => a.quantity - b.quantity);
          setBooks(sortedBooks);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Book List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Date Added</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.type.name}</td>
              <td>{book.dateAdded}</td>
              <td>{book.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
