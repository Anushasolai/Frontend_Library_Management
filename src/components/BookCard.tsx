
import React from 'react';
import '../styles/BookCard.css';

interface Book {
  id: number;
  name: string;
}

interface BookCardProps {
  book: Book;
  showForm: boolean;
  onViewDetails: (id: number) => void;
  onCancel: () => void;
  onBorrow: (id: number, startDate: string, endDate: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, showForm, onViewDetails, onCancel, onBorrow }) => {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleBorrow = () => {
    onBorrow(book.id, startDate, endDate);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="book-card" onClick={() => onViewDetails(book.id)}>
      <h3>{book.name}</h3>
      {showForm && (
        <div className="borrow-form">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <div className="form-actions">
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
            <button className="borrow-button" onClick={handleBorrow}>Borrow</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
