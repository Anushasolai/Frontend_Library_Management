
import Modal from 'react-modal';
import'../styles/UserBookRelationCard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';






interface UserBookRelation {
  userId: number;
  bookId: number;
  endDate: string;
}

interface UserBookRelationCardProps {
  onRequestClose: () => void;
}

const UserBookRelationCard: React.FC<UserBookRelationCardProps> = ({ onRequestClose }) => {
  const [relations, setRelations] = useState<UserBookRelation[]>([]);

  useEffect(() => {
    const fetchRelations = async () => {
      try {
        const response = await axios.get('/userbooks');
        setRelations(response.data);
      } catch (error) {
        console.error('Error fetching user-book relations:', error);
      }
    };

    fetchRelations();
  }, []);

  return (
    <Modal>
       
    </Modal>
  );
};

export default UserBookRelationCard;



  
