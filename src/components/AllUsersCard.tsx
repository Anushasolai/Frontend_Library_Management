

 import '../styles/AllUsersCard.css';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; // Import Axios library

Modal.setAppElement('#root');//-------

// Define an interface for the user
interface User {
    ID: number;
    username: string;
   
}
interface AllUsersCardProps {
        onRequestClose: () => void;
    }


const AllUsersCard: React.FC<AllUsersCardProps> = ({ onRequestClose }) => {
    const [users, setUsers] = useState<User[]>([]); // Explicitly type the state

    useEffect(() => {
        // Define a function to fetch data from the backend
        const fetchUsers = async () => {
            try {
                // Make a GET request to fetch users data from your backend endpoint
                const response = await axios.get('http://localhost:9082/admin/viewUser');
                // Set the users state with the data fetched from the backend
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response);
            }
        };

        // Call the fetchUsers function when the component mounts
        fetchUsers();
    }, []); // Pass an empty dependency array to ensure the effect runs only once when the component mounts

    return (
        <div>
             <Modal
           isOpen={true}
           onRequestClose={onRequestClose}
          contentLabel="All Users"
            className="modal"
            overlayClassName="overlay"
       >
            <h2>All Users</h2>
                        <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        
                    </tr>
               </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.ID}>
                            <td>{user.ID}</td>
                            <td>{user.username}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onRequestClose} className="close-button">Cancel</button>
            </Modal>
        </div>
    );
};

export default AllUsersCard;
