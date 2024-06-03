// src/pages/UserDashboard.tsx
import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import api from '../api/axiosConfig';
import '../styles/UserDashboard.css';

const UserDashboard: React.FC = () => {
  const [books, setBooks] = useState([]);
  const [activeBookId, setActiveBookId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/user/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleViewDetails = (id: number) => {
    setActiveBookId(id);
  };

  const handleCancel = () => {
    setActiveBookId(null);
  };

  const handleBorrow = async (id: number, startDate: string, endDate: string) => {
    try {
      await api.post("/user/borrow", { bookId: id, startDate, endDate });
      console.log('Borrowed:', { id, startDate, endDate });
      setActiveBookId(null);
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Book Details</h2>
      <div className="book-cards">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            showForm={activeBookId === book.id}
            onViewDetails={handleViewDetails}
            onCancel={handleCancel}
            onBorrow={handleBorrow}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
