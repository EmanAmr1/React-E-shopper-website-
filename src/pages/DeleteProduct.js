import { axiosInstance } from "../apis/config";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";



const DeleteProduct = () => {

    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    const params = useParams();
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };



    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/API/deleteProduct/${params.id}/`, { headers });
            setIsDeleted(true);
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product.');
        }
    };


    return (
        <div>
            {isDeleted ? (

                <p className="mt-5 ">Product deleted successfully.</p>
            ) : (
                <>
                    <p>Are You sure to delete this Product ?</p>
                    <button onClick={handleDelete}>Delete Product</button></>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DeleteProduct;