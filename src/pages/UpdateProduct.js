import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
import { faImage, faMoneyBillAlt, faTag, faBalanceScale, faPlus, faWarehouse, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";

const UpdateProduct = () => {

    const params = useParams();
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };



/////////////////////////////////////////////////////////

const [userId, setUserId] = useState(null);
const [user, setUser] = useState(null);
const [updatedUser, setUpdatedUser] = useState({
  first_name:'',
  last_name:'',
  address:'',
  phone:'',
  birthdate:''
});
useEffect(() => {
  const token = Cookies.get('token');
  const headers = {
    Authorization: `Token ${token}`
  };

  axiosInstance.get('http://localhost:8000/api/profile/', { headers })
    .then((res) => {
      setUser(res.data.message);
      setUserId(res.data.message.id);
      setUpdatedUser(res.data.message); 
      
    })
    .catch((error) => {
      console.error("Fetch user error:", error);
      
    });
}, []);


    const [subcategories, setSubCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [updatePro, setUpdatePro] = useState({
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
        subcategory: '',
        stock_S: '',
        stock_M: '',
        stock_L: '',
        stock_XL: '',
        sizeable: '',
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


    useEffect(() => {
        axiosInstance.get(`/API/getProduct/${params.id}/`,{ headers } )
            .then(res => {
                setUpdatePro(res.data.product);
                setErrors([]);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [params.id, setUpdatePro]);


  

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setUpdatePro({
                ...updatePro,
                [name]: checked
            });
        } else {
            setUpdatePro({
                ...updatePro,
                [name]: value
            });
        }
    };




    const handleImageChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            setUpdatePro({
                ...updatePro,
                image: file
            });
        } else if (e.target.name === "subImageOne") {
            setUpdatePro({
                ...updatePro,
                subImageOne: e.target.files[0]
            });
        }
        else if (e.target.name === "subImageTwo") {
            setUpdatePro({
                ...updatePro,
                subImageTwo: e.target.files[0]
            });
        }
        else if (e.target.name === "subImageThree") {
            setUpdatePro({
                ...updatePro,
                subImageThree: e.target.files[0]
            });
        }

        else if (e.target.name === "subImageFour") {
            setUpdatePro({
                ...updatePro,
                subImageFour: e.target.files[0]
            });
        }


    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));
        setSubCategories(selectedCategory.subcategories);
        setUpdatePro({ ...updatePro, category: selectedCategoryId, subcategory: '' });
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();


        if (!updatePro.name || !updatePro.description || !updatePro.price || !updatePro.brand || !updatePro.stock || !updatePro.category) {
            setErrors(prevErrors => [...prevErrors, 'Please fill in all required fields.']);
            return;
        }


        if (updatePro.newprice && updatePro.price && parseFloat(updatePro.newprice) >= parseFloat(updatePro.price)) {
            setErrors(prevErrors => [...prevErrors, 'New price should be less than the original price.']);
            return;
        }

        Object.keys(updatePro).forEach(key => {
            formData.append(key, updatePro[key]);
        });


        axiosInstance.put(`/API/updateProduct/${params.id}/`, formData, { headers })
            .then(res => {
                setUpdatePro(res.data.product);
                setSuccessMessage('Product successfully updated');
                setErrors([]);
            })
            .catch(error => {
                console.error('Error updating product:', error);
                setErrors(['Error updating product']);
            });

    };






    return (
        <>
            <div className="card-header" style={{ backgroundColor: '#ca1515', color: '#FFFFFF' }}>
                <h3 className="mb-0 " style={{ color: '#FFFFFF' }}>Update Product</h3>
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
                                        <input type="text" id="name" name="name" value={updatePro?.name || ''} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            <FontAwesomeIcon icon={faWarehouse} /> Product Description:
                                        </label>
                                        <textarea id="description" name="description" value={updatePro?.description || ''} onChange={handleChange} className="form-control" required  ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> Price:
                                        </label>
                                        <input type="text" id="price" name="price" value={updatePro?.price || ''} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="brand" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Brand:
                                        </label>
                                        <input type="text" id="brand" name="brand" value={updatePro?.brand || ''} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label">
                                            <FontAwesomeIcon icon={faBalanceScale} /> Stock:
                                        </label>
                                        <input type="number" id="stock" name="stock" value={updatePro?.stock || ''} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="new" name="new" checked={updatePro?.new || ''} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="new" className="form-check-label">New</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sale" name="sale" checked={updatePro?.sale || ''} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="sale" className="form-check-label">Sale</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sizeable" name="sizeable" checked={updatePro?.sizeable || ''} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="sizeable" className="form-check-label">sizeable</label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ratings" className="form-label">
                                            <FontAwesomeIcon icon={faStar} className="me-2" />
                                            Ratings:
                                        </label>
                                        <input type="number" id="ratings" name="ratings" value={updatePro?.ratings || ''} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newprice" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> New Price:
                                        </label>
                                        <input type="text" id="newprice" name="newprice" value={updatePro?.newprice || ''} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} /> Category:
                                        </label>
                                        <select id="category" name="category" value={updatePro?.category || ''} onChange={handleCategoryChange} className="form-control" >
                                          
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subcategory" className="form-label">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} /> Subcategory:
                                        </label>
                                        <select id="subcategory" name="subcategory" value={updatePro?.subcategory || ''} onChange={handleChange} className="form-control" >
                                          
                                            {subcategories.map(subcategory => (
                                                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
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
                                        <input type="number" id="stock_S" name="stock_S" value={updatePro?.stock_S || ''} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_M" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (M):
                                        </label>
                                        <input type="number" id="stock_M" name="stock_M" value={updatePro?.stock_M || ''} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_L" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (L):
                                        </label>
                                        <input type="number" id="stock_L" name="stock_L" value={updatePro?.stock_L || ''} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_XL" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (XL):
                                        </label>
                                        <input type="number" id="stock_XL" name="stock_XL" value={updatePro?.stock_XL || ''} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="images" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product Image:
                                        </label>
                                        <input type="file" id="image" name="image" onChange={handleImageChange}        required className="form-control" multiple defaultValue="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subImageOne" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product subImageOne:
                                        </label>
                                        <input type="file" id="subImageOne" name="subImageOne" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
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
                                        <input type="file" id="subImageThree" name="subImageThree" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageFour" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product subImageFour:
                                        </label>
                                        <input type="file" id="subImageFour" name="subImageFour" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
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

export default UpdateProduct;
