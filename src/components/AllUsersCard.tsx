import '../styles/AllUsersCard.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; 

Modal.setAppElement('#root');


interface User {
    ID: number;
    username: string;
   
}
interface AllUsersCardProps {
        onRequestClose: () => void;
    }


const AllUsersCard: React.FC<AllUsersCardProps> = ({ onRequestClose }) => {
    const [users, setUsers] = useState<User[]>([]); 

    useEffect(() => {
        
        const fetchUsers = async () => {
            try {
               
                const response = await axios.get('http://localhost:9082/admin/viewUser');
               
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

       
        fetchUsers();
    }, []); 
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
