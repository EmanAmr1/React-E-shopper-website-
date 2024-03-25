import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
function ProductManagement() {
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
    };
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axiosInstance.get("/API/allpro/")
            .then(res => {
                setProducts(res.data.products)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };


    const handleDeleteProduct = (productId) => {
        console.log(productId)
        axiosInstance.delete(`http://127.0.0.1:8000/API/deleteProduct/${productId}/`, { headers })
            .then(() => {
                console.log("Product deleted successfully");
                setProducts(products.filter(product => product.id !== productId));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };





    /*
        const handleUpdateProduct = (productId) => {
            console.log(productId)
        axiosInstance.put(`/API/updateProduct/${productId}/`, formData, { headers })
        .then(res => {
            setUpdatePro(prevState => ({
                ...prevState,
                ...res.data.product
            }));
            setSuccessMessage('Product successfully updated');
            setErrors([]);
    
        })
        .catch(error => {
            console.error('Error updating product:', error);
            setErrors(['Error updating product']);
        });
        }
    */



    return (
        <>
            <h3>All Products</h3>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">image</th>
                        <th scope="col">description</th>
                        <th scope="col">brand</th>
                        <th scope="col">category</th>
                        <th scope="col">ratings</th>
                        <th scope="col">price</th>
                        <th scope="col">newprice</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id} className="table-light">
                            <td>{prod.id}</td>
                            <td>{prod.name}</td>
                            <td><img src={`http://127.0.0.1:8000${prod.image}`} alt={prod.name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{prod.description}</td>
                            <td>{prod.brand}</td>
                            <td>{prod.category}</td>
                            <td>{prod.ratings}</td>
                            <td>{prod.price}</td>
                            <td>{prod.newprice}</td>

                            <td>

                                <button className="btn btn-danger" onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
                                <Link to={`/AdminUpdatePro/${prod.id}`} className="btn ">Update</Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ProductManagement;
