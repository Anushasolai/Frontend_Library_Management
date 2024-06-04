import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";


interface Book {
  ID: number;
  bookname: string;
}
interface User {
  ID: number;
  username: string;
}
interface BookRelation{
  UBID: number;
  username: User;
  bookname: Book;
  enddate: string;
  startdate: string;
}

interface BookRelationCardProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const BookRelationCard: React.FC<BookRelationCardProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [relations, setRelations] = useState<BookRelation[]>([]);

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

  const handleDeleteRelation = (userId: number, bookId: number) => {
    axios
      .delete(`http://localhost:9082/admin/deleteUB/${userId}`)
      .then(() => {
        setRelations(
          relations.filter(
            (rel) => !(rel.username.ID === userId && rel.bookname.ID === bookId)
          )
        );
      })
      .catch((error) => console.error("Error deleting relation:", error));
  };

  const handleUpdateEndDate = (
    usernameId: number,
    booknameId: number,
    newEndDate: string
  ) => {
    setRelations(
      relations.map((rel) =>
        rel.username.ID === usernameId && rel.bookname.ID === booknameId
          ? { ...rel, enddate: newEndDate }
          : rel
      )
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="BookRelation"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>User-Book Relations</h2>
      <table className="relation-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Book</th>
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
              <td>
                 <button
                  onClick={() =>
                    handleDeleteRelation(rel.username.ID, rel.bookname.ID)
                  }
                >
                  Delete
                </button> 
                 <button
                  onClick={() =>
                    handleUpdateEndDate(
                      rel.username.ID,
                      rel.bookname.ID,
                      prompt("Enter new end date:", rel.enddate) || rel.enddate
                    )
                  }
                >
                  Update
                </button> 
              </td> 
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

export default BookRelationCard;

