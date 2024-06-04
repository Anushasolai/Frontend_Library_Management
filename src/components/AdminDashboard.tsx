import React, { useState } from 'react';
import '../styles/AdminDashboard.css'; 
import AllUsersCard from './AllUsersCard';
import AllBooksCard from './AllBooksCard';
import BookRelationCard from './BookRelationCard';


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
        <div className="card" onClick={() => handleCardClick('BookRelation')}>
          <h3> User & Book</h3>
        </div>
      </div>
      {selectedCard === 'allUsers' && <AllUsersCard onRequestClose={handleCloseModal} />}
      {selectedCard === 'allBooks' && <AllBooksCard onRequestClose={handleCloseModal} />}
      {selectedCard === 'BookRelation' && <BookRelationCard onRequestClose={handleCloseModal} isOpen={true} />} 
    </div>
  );
};

export default AdminDashboard;



