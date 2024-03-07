import React from 'react';
import { useState } from "react";


import { axiosInstance } from "../apis/config";

const AddProduct = () => {

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
        thumbnail: '',
        category: '',
        stock_S: '',
        stock_M: '',
        stock_L: '',
        stock_XL: '',
        images: [],

    }]);



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;



        // Handle checkboxes
        if (type === 'checkbox') {
            setAddPro({
                ...addPro,
                [name]: checked
            });
        } else if (type === 'file') { // Handle file inputs for images and thumbnail
            setAddPro({
                ...addPro,
                [name]: e.target.files[0] // Assuming you only allow uploading one file for thumbnail
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
            thumbnail: addPro.thumbnail,
            category: addPro.category,
            stock_S: addPro.stock_S,
            stock_M: addPro.stock_M,
            stock_L: addPro.stock_L,
            stock_XL: addPro.stock_XL,
            images: addPro.images,




        }
        axiosInstance.post('/API/addProduct/', data).then(res => {

        }
        );
    };




    return (


        <>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
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
                                <input type="number" id="category" name="category" value={addPro.category} onChange={handleChange} className="form-control" />
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

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )

}


export default AddProduct;