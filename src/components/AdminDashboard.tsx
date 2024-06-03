import React, { useState } from 'react';
import '../styles/AdminDashboard.css'; // Import the CSS file
import AllUsersCard from './AllUsersCard';
import AllBooksCard from './AllBooksCard';
import UserBookRelationCard from './UserBookRelationCard';

const AdminDashboard: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div>
     
      <div className="admin-dashboard-container">
        <div className="card" onClick={() => handleCardClick('allUsers')}>
          <h3> Users</h3>
        </div>
        <div className="card" onClick={() => handleCardClick('allBooks')}>
          <h3> Books</h3>
        </div>
        <div className="card" onClick={() => handleCardClick('userBookRelation')}>
          <h3> User & Book</h3>
        </div>
      </div>
      {selectedCard === 'allUsers' && <AllUsersCard onRequestClose={handleCloseModal} />}
      {selectedCard === 'allBooks' && <AllBooksCard onRequestClose={handleCloseModal} />}
      {selectedCard === 'userBookRelation' && <UserBookRelationCard onRequestClose={handleCloseModal} />}
    </div>
  );
};

export default AdminDashboard;



