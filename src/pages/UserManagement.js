import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from 'react-router-dom';

function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
        axios.get("http://localhost:8000/api/allUser/", { headers: { Authorization: `Token ${token}` } })
            .then((response) => {
                setUsers(response.data.Users);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
        }
    }, []);

    console.log(users);
    

    return (
        <>
            <h3>User Management</h3>
            <table className="table table-success table-striped">
                <thead >
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Address</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="table-light">
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.birthdate}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                            <td>{user.usertype}</td>
                           
                            <td>
                            <Link to={`/UpdateUser/${user.id}`}><button className="btn btn-dark">Update</button></Link>
  
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default UserManagement;

