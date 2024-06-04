import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../styles/UserBookRelationCard.css";

interface Book {
  ID: number;
  bookname: string;
}
interface User {
  ID: number;
  username: string;
}
interface UserBookRelation {
  UBID: number;
  username: User;
  bookname: Book;
  enddate: string;
  startdate: string;
}

interface UserBookRelationCardProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const UserBookRelationCard: React.FC<UserBookRelationCardProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [relations, setRelations] = useState<UserBookRelation[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:9082/user/borrowed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRelations(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User-Book Relation"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>User-Book Relations</h2>
      <table className="relation-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>BookID</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {relations.map((rel) => (
            <tr key={rel.UBID}>
              <td>{rel.username.username}</td>
              <td>{rel.bookname.bookname}</td>
              <td>{rel.startdate}</td>
              <td>{rel.enddate}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRequestClose} className="close-button">
        Close
      </button>
    </Modal>
  );
};

export default UserBookRelationCard;


