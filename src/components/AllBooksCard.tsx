
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../styles/AllBooksCard.css";



interface Book {
  ID: number;
  bookname: string;
  
}

interface AllBooksCardProps {
  onRequestClose: () => void;
}

const AllBooksCard: React.FC<AllBooksCardProps> = ({ onRequestClose }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBookName, setNewBookName] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:9082/admin/show", {
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

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const newBook = {
        bookname: newBookName,
      };
      const response = await axios.post(
        "http://localhost:9082/admin/createBook",
        newBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks((prevBooks) => [...prevBooks, response.data]);
    
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9082/admin/deleteBook/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book.ID !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
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
                <button onClick={() => handleDeleteBook(book.ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-book-form">
        <input
          type="text"
          placeholder="Book Name"
          value={newBookName}
          onChange={(e) => setNewBookName(e.target.value)} 
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <button onClick={onRequestClose} className="close-button">
        Close
      </button>
    </Modal>
  );
};

export default AllBooksCard;
