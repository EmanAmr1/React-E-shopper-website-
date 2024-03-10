
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
import { faImage, faMoneyBillAlt, faTag, faBalanceScale, faPlus, faWarehouse, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';



const AddProduct = () => {


    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };


    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [addPro, setAddPro] = useState({
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
        image: null,
        subImageOne: null,
        subImageTwo: null,
        subImageThree: null,
        subImageFour: null
    });
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        axiosInstance.get('/API/categories/', { headers })
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setAddPro({
                ...addPro,
                [name]: checked
            });
        } else {
            setAddPro({
                ...addPro,
                [name]: value
            });
        }
    };




    const handleImageChange = (e) => {
        if (e.target.name === "image") {
            setAddPro({
                ...addPro,
                image: e.target.files[0]
            });
        } else if (e.target.name === "subImageOne") {
            setAddPro({
                ...addPro,
                subImageOne: e.target.files[0]
            });
        }
        else if (e.target.name === "subImageTwo") {
            setAddPro({
                ...addPro,
                subImageTwo: e.target.files[0]
            });
        }
        else if (e.target.name === "subImageThree") {
            setAddPro({
                ...addPro,
                subImageThree: e.target.files[0]
            });
        }

        else if (e.target.name === "subImageFour") {
            setAddPro({
                ...addPro,
                subImageFour: e.target.files[0]
            });
        }


    };



    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();


        if (!addPro.name || !addPro.description || !addPro.price || !addPro.brand || !addPro.stock || !addPro.category) {
            setErrors(prevErrors => [...prevErrors, 'Please fill in all required fields.']);
            return;
        }


        if (addPro.newprice && addPro.price && parseFloat(addPro.newprice) >= parseFloat(addPro.price)) {
            setErrors(prevErrors => [...prevErrors, 'New price should be less than the original price.']);
            return;
        }





        Object.keys(addPro).forEach(key => {
            formData.append(key, addPro[key]);
        });



        axiosInstance.post('/API/addProduct/', formData, { headers })
            .then(res => {
                setSuccessMessage('Product successfully added');
                event.target.reset();
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
                    category: '',
                    stock_S: '',
                    stock_M: '',
                    stock_L: '',
                    stock_XL: '',
                    image: null,
                    subImageOne: null,
                    subImageTwo: null,
                    subImageThree: null,
                    subImageFour: null
    
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
                        <div className="card h-100 shadow-lg">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            <FontAwesomeIcon icon={faTag} /> Product Name:
                                        </label>
                                        <input type="text" id="name" name="name" value={addPro.name} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            <FontAwesomeIcon icon={faWarehouse} /> Product Description:
                                        </label>
                                        <textarea id="description" name="description" value={addPro.description} onChange={handleChange} className="form-control" required  ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> Price:
                                        </label>
                                        <input type="text" id="price" name="price" value={addPro.price} onChange={handleChange} className="form-control" required  />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="brand" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Brand:
                                        </label>
                                        <input type="text" id="brand" name="brand" value={addPro.brand} onChange={handleChange} className="form-control" required  />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label">
                                            <FontAwesomeIcon icon={faBalanceScale} /> Stock:
                                        </label>
                                        <input type="number" id="stock" name="stock" value={addPro.stock} onChange={handleChange} className="form-control" required  />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="new" name="new" checked={addPro.new} onChange={handleChange} className="form-check-input"    />
                                        <label htmlFor="new" className="form-check-label">New</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sale" name="sale" checked={addPro.sale} onChange={handleChange} className="form-check-input"  />
                                        <label htmlFor="sale" className="form-check-label">Sale</label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ratings" className="form-label">
                                            <FontAwesomeIcon icon={faStar} className="me-2" />
                                            Ratings:
                                        </label>
                                        <input type="number" id="ratings" name="ratings" value={addPro.ratings} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newprice" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> New Price:
                                        </label>
                                        <input type="text" id="newprice" name="newprice" value={addPro.newprice} onChange={handleChange} className="form-control"  />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} /> Category:
                                        </label>
                                        <select id="category" name="category" value={addPro.category} onChange={handleChange} className="form-control" >
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-lg">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">

                                    <div className="mb-3">
                                        <label htmlFor="stock_S" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (S):
                                        </label>
                                        <input type="number" id="stock_S" name="stock_S" value={addPro.stock_S} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_M" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (M):
                                        </label>
                                        <input type="number" id="stock_M" name="stock_M" value={addPro.stock_M} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_L" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (L):
                                        </label>
                                        <input type="number" id="stock_L" name="stock_L" value={addPro.stock_L} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_XL" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (XL):
                                        </label>
                                        <input type="number" id="stock_XL" name="stock_XL" value={addPro.stock_XL} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="images" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product Image:
                                        </label>
                                        <input type="file" id="image" name="image" onChange={handleImageChange} required className="form-control" multiple defaultValue=""  />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subImageOne" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product subImageOne:
                                        </label>
                                        <input type="file" id="subImageOne" name="subImageOne" onChange={handleImageChange} required className="form-control" multiple  defaultValue="" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageTwo" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product subImageTwo:
                                        </label>
                                        <input type="file" id="subImageTwo" name="subImageTwo" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subImageThree" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product subImageThree:
                                        </label>
                                        <input type="file" id="subImageThree" name="subImageThree" onChange={handleImageChange} required className="form-control" multiple defaultValue=""  />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageFour" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product subImageFour:
                                        </label>
                                        <input type="file" id="subImageFour" name="subImageFour" onChange={handleImageChange} required className="form-control" multiple  defaultValue="" />
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
    );
}

export default AddProduct;
