import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AddBook = () => {
  const navigate = useNavigate();
  const [bookId, setBookId] = useState('');
  const [bookName, setBookName] = useState('');
  const [typeId, setTypeId] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/types')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      });
  }, []);

  const handleAddBook = () => {
    if (!/^BO-\d{4}$/.test(bookId)) {
      alert('Book ID must be in the format BO-XXXX');
      return;
    }
    if (bookName.length > 100) {
      alert('Book name cannot exceed 100 characters');
      return;
    }
    const today = new Date();
    const dateInput = new Date(dateAdded.split('/').reverse().join('-'));
    if (dateInput > today) {
      alert('Date added cannot be in the future');
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      alert('Quantity must be a positive integer');
      return;
    }

    const newBook = {
      bookId: bookId,
      name: bookName,
      typeId: typeId,
      dateAdded: dateAdded,
      quantity: Number(quantity)
    };

    fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
    .then(() => {
      alert('Book added successfully');
      setBookId('');
      setBookName('');
      setTypeId('');
      setDateAdded('');
      setQuantity('');
      navigate("/books");
    });
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleAddBook(); }}>
        <div>
          <label>Book ID</label>
          <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>
        <div>
          <label>Book Name</label>
          <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
            {categories.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date Added</label>
          <input type="date" value={dateAdded} onChange={(e) => setDateAdded(e.target.value)} />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
