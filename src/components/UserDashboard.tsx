import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import UserBookRelationCard from "./UserBookRelationCard"; 
import "../styles/AllBookCards.css";
import "../styles/BorrowFormCard.css";

interface Book {
  ID: number;
  bookname: string;

}

interface AllBooksCardProps {
  onRequestClose: () => void;
}

const UserDashboard: React.FC<AllBooksCardProps> = ({ onRequestClose }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeBookId, setActiveBookId] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");
  const [startdate, setStartDate] = useState<string>("");
  const [enddate, setEndDate] = useState<string>("");
  const [bookname, setBookname] = useState<string>("");
  const [showBorrowedBooks, setShowBorrowedBooks] = useState<boolean>(false); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:9082/user/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async () => {
    if (!username || !startdate || !enddate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9082/user/borrow",
        { username, bookname, startdate, enddate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      console.log("Borrowed:", { username, bookname, startdate, enddate });
      
    } catch (error) {
      console.error("Error borrowing book:", error );
    }
  };

  const handleOpenBorrowForm = (id: number) => {
    const book = books.find((book) => book.ID === id);
    if (book) {
      setBookname(book.bookname);
      setActiveBookId(id);
    }
  };

  const handleCancel = () => {
    setActiveBookId(null);
    setUsername("");
    setBookname("");
    setStartDate("");
    setEndDate("");
  };

  const handleShowBorrowedBooks = () => {
    setShowBorrowedBooks(true);
  };

  const handleCloseBorrowedBooks = () => {
    setShowBorrowedBooks(false);
  };

  return (
    <div>
      {!showBorrowedBooks ? (
        <Modal
          isOpen={true}
          onRequestClose={onRequestClose}
          contentLabel="All Books"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>All Books</h2>
          <table className="book-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.ID}>
                  <td>{book.ID}</td>
                  <td>{book.bookname}</td>
                  <td>
                    <button onClick={() => handleOpenBorrowForm(book.ID)}>
                      Borrow
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <button onClick={handleShowBorrowedBooks}>Show Borrowed Books</button>
          </table>
          <div>
          </div>
          {activeBookId !== null && (
            <div className="borrow-form-card">
              <h3>Borrow Book</h3>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                Bookname:
                <input
                  type="text"
                  value={bookname}
                  onChange={(e) => setBookname(e.target.value)}
                />
              </label>
              <label>
                Start Date:
                <input
                  type="text"
                  value={startdate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                End Date:
                <input
                  type="text"
                  value={enddate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <div className="form-actions">
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="borrow-button" onClick={handleBorrow}>
                  Borrow
                </button>
              </div>
            </div>
          )}
        </Modal>
      ) : (
        <UserBookRelationCard isOpen={showBorrowedBooks} onRequestClose={handleCloseBorrowedBooks} />
      )}
    </div>
  );
};

export default UserDashboard;

           
