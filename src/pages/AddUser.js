import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function AddUser() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        usertype: "",
        address: "",
        shopname: "",
        is_active: true,
        is_staff: false,
        is_superuser: false,
        birthdate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = Cookies.get("token");
        if (token) {
            axios.post("http://localhost:8000/add-user/", formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    console.log("User added successfully");
                    // Reset form data
                    setFormData({
                        first_name: "",
                        last_name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        phone: "",
                        usertype: "",
                        address: "",
                        shopname: "",
                        is_active: true,
                        is_staff: false,
                        is_superuser: false,
                        birthdate: "",
                    });
                })
                .catch((error) => {
                    console.error("Error adding user:", error);
                });
        }
    };

    return (
        <div className="container">
            <h3 className="my-4">Add User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="usertype" className="form-label">User Type</label>
                    <input type="text" className="form-control" id="usertype" name="usertype" value={formData.usertype} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="shopname" className="form-label">Shop Name</label>
                    <input type="text" className="form-control" id="shopname" name="shopname" value={formData.shopname} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">Birthdate</label>
                    <input type="date" className="form-control" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="is_active">Is Active</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_staff" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="is_staff">Is Staff</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_superuser" name="is_superuser" checked={formData.is_superuser} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="is_superuser">Is Superuser</label>
                </div>
                <button type="submit" className="btn btn-dark">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;

