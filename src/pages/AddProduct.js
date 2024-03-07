import React from 'react';
import { useState, useEffect } from "react";


import { axiosInstance } from "../apis/config";

const AddProduct = () => {


    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        axiosInstance.get('/API/categories/')
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);


    const [addPro, setAddPro] = useState([{
        name: '',
        description: '',
        price: '',
        brand: '',
        stock: '',
        ratings: '',
        new: true,
        sale: true,
        newprice: '',
        category: '',
        stock_S: '',
        stock_M: '',
        stock_L: '',
        stock_XL: '',
        images: [],


    }]);

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;



        // Handle checkboxes
        if (type === 'checkbox') {
            setAddPro({
                ...addPro,
                [name]: checked
            });
        } else if (type === 'file') {
            setAddPro({
                ...addPro,
                [name]: e.target.files[0],

            });
        } else { // Handle other inputs
            setAddPro({
                ...addPro,
                [name]: value
            });
        }
    };




    const handleSubmit = (event) => {
        event.preventDefault();


        if (!addPro.name || !addPro.description || !addPro.price || !addPro.brand || !addPro.stock || !addPro.category) {
            setErrors(prevErrors => [...prevErrors, 'Please fill in all required fields.']);
            return;
        }


        if (addPro.newprice && addPro.price && parseFloat(addPro.newprice) >= parseFloat(addPro.price)) {
            setErrors(prevErrors => [...prevErrors, 'New price should be less than the original price.']);
            return;
        }


        const data = {
            name: addPro.name,
            description: addPro.description,
            price: addPro.price,
            brand: addPro.brand,
            stock: addPro.stock,
            ratings: addPro.ratings,
            new: addPro.new,
            sale: addPro.sale,
            newprice: addPro.newprice,
            category: addPro.category,
            stock_S: addPro.stock_S,
            stock_M: addPro.stock_M,
            stock_L: addPro.stock_L,
            stock_XL: addPro.stock_XL,
            images: addPro.images,
        }
        axiosInstance.post('/API/addProduct/', data)
            .then(res => {
                setSuccessMessage('Product successfully added');
                // Clear form after successful submission

                setAddPro({
                    name: '',
                    description: '',
                    price: '',
                    brand: '',
                    stock: '',
                    ratings: '',
                    new: true,
                    sale: true,
                    newprice: '',
                    thumbnail: '',
                    category: '',
                    stock_S: '',
                    stock_M: '',
                    stock_L: '',
                    stock_XL: '',
                    images: [],
                });


                setErrors([]);


            })


            .catch(error => {
                console.error('Error adding product:', error);
            });
    };




    return (


        <>
            <div className="card-header" style={{ backgroundColor: '#ca1515', color: '#FFFFFF' }}>
                <h3 className="mb-0 " style={{ color: '#FFFFFF' }}>Add New Product</h3>
            </div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">

                            <div className="card-body">

                                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Product Name:</label>
                                        <input type="text" id="name" name="name" value={addPro.name} onChange={handleChange} className="form-control" />

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Product Description:</label>
                                        <textarea id="description" name="description" value={addPro.description} onChange={handleChange} className="form-control"></textarea>

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price:</label>
                                        <input type="text" id="price" name="price" value={addPro.price} onChange={handleChange} className="form-control" />

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="brand" className="form-label">Brand:</label>
                                        <input type="text" id="brand" name="brand" value={addPro.brand} onChange={handleChange} className="form-control" />

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label">Stock:</label>
                                        <input type="number" id="stock" name="stock" value={addPro.stock} onChange={handleChange} className="form-control" />

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="ratings" className="form-label">Ratings:</label>
                                        <input type="text" id="ratings" name="ratings" value={addPro.ratings} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="new" name="new" checked={addPro.new} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="new" className="form-check-label">New</label>
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sale" name="sale" checked={addPro.sale} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="sale" className="form-check-label">Sale</label>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newprice" className="form-label">New Price:</label>
                                        <input type="text" id="newprice" name="newprice" value={addPro.newprice} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="images" className="form-label">Product Images:</label>
                                        <input type="file" id="images" name="images" onChange={handleChange} className="form-control" multiple />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">Category:</label>
                                        <select id="category" name="category" value={addPro.category} onChange={handleChange} className="form-control">
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_S" className="form-label">Stock (S):</label>
                                        <input type="number" id="stock_S" name="stock_S" value={addPro.stock_S} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_M" className="form-label">Stock (M):</label>
                                        <input type="number" id="stock_M" name="stock_M" value={addPro.stock_M} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_L" className="form-label">Stock (L):</label>
                                        <input type="number" id="stock_L" name="stock_L" value={addPro.stock_L} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_XL" className="form-label">Stock (XL):</label>
                                        <input type="number" id="stock_XL" name="stock_XL" value={addPro.stock_XL} onChange={handleChange} className="form-control" />
                                    </div>


                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ca1515', borderColor: '#ca1515' }} >Submit</button>

                                    {errors.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.map((error, index) => (
                                                <div key={index}>{error}</div>
                                            ))}
                                        </div>
                                    )}
                                    {successMessage && (
                                        <div className="alert alert-success" role="alert">
                                            {successMessage}
                                        </div>
                                    )}
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}


export default AddProduct;