import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
import { faImage, faMoneyBillAlt, faTag, faBalanceScale, faPlus, faWarehouse, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UpdateProduct = () => {

    const params = useParams();
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };


const navigate = useNavigate();
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

    const [checkstock, setCheckstock] = useState(0);
    useEffect(() => {
        axiosInstance.get(`/API/getProduct/${params.id}/`,{ headers } )
            .then(res => {
                setUpdatePro(res.data.product);
                setCheckstock(res.data.product.checkstock);
                console.log("ddd",checkstock);
                setErrors([]);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    navigate('/not-found'); // Redirect to not-found page if product is not found
                }
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

    /*const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));
        setSubCategories(selectedCategory.subcategories);
        setUpdatePro({ ...updatePro, category: selectedCategoryId, subcategory: '' });
    };*/


    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
    
        // Check if the selected category is not "Select Category"
        if (selectedCategoryId !== "") {
            const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));
            setSubCategories(selectedCategory.subcategories);
        } else {
            // If the selected category is "Select Category", set subcategories to an empty array
            setSubCategories([]);
        }
    
        setUpdatePro({ ...updatePro, category: selectedCategoryId, subcategory: '' });
    };

    const [expired, setExpired] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);
    useEffect(() => {
         // Reset expired state when component mounts
        axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${userId}`, { headers })
            .then((res) => {
                setSubscriptionInfo(res.data);
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, [userId]); // Add userId as a dependency to trigger useEffect when it changes
    
    useEffect(() => {
        if (subscriptionInfo && subscriptionInfo.stock) {
            const remainingProducts = getRemainingProducts(subscriptionInfo);
            console.log("use eee",remainingProducts);
            const isExpired = remainingProducts == 0;
            setExpired(isExpired);
            console.log("isExpired",isExpired)
            
            console.log(expired) // Update the expired state
           
        }
    }, [subscriptionInfo]);
    useEffect(() => {
        // Check if subscription has expired
        if (expired) {
            alert('Your subscription has expired. Please renew your subscription to add products.');
            navigate('/vendorprofile'); // Redirect to homepage or another appropriate page
        }
    }, [expired]); 
    
    const getRemainingProducts = (subscriptionInfo) => {
        let productLimit = 0;
        switch (subscriptionInfo.plan) {
            case 1:
                productLimit = 500;
                break;
            case 2:
                productLimit = 1200;
                break;
            case 3:
                productLimit = 2500;
                break;
            default:
                productLimit = 0;
        }
        console.log("in eee",subscriptionInfo.stock);
        return productLimit - subscriptionInfo.stock;

    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();




        if (!updatePro.name) {
            setErrors(prevErrors => [...prevErrors, 'Please fill name.']);
            return;
        }
        if (updatePro.price<=0) {
            setErrors(prevErrors => [...prevErrors, 'the price must be greater than zero.']);
            return;
        }
        if (updatePro.newprice<0) {
            setErrors(prevErrors => [...prevErrors, 'the new price must be greater than zero.']);
            return;
        }


        if (!updatePro.description ) {
            setErrors(prevErrors => [...prevErrors, 'Please fill description.']);
            return;
        }

        if ( !updatePro.price ) {
            setErrors(prevErrors => [...prevErrors, 'Please fill price']);
            return;
        }

        if ( !updatePro.brand ) {
            setErrors(prevErrors => [...prevErrors, 'Please fill brand.']);
            return;
        }









       /* if (!updatePro.name || !updatePro.description || !updatePro.price || !updatePro.brand || !updatePro.stock || !updatePro.category) {
            setErrors(prevErrors => [...prevErrors, 'Please fill in all required fields.']);
            return;
        }*/


        if (updatePro.newprice && updatePro.price && parseFloat(updatePro.newprice) >= parseFloat(updatePro.price)) {
            setErrors(prevErrors => [...prevErrors, 'New price should be less than the original price.']);
            return;
        }



  
        if (updatePro.category === '') {
            setErrors(prevErrors => [...prevErrors, 'Please select a category.']);
            return;
        }




        Object.keys(updatePro).forEach(key => {
            formData.append(key, updatePro[key]);
        });

    ///////////////////////////////////
    axiosInstance.get('http://127.0.0.1:8000/api/payment-history/', { headers })
    .then(res => {
        let newStockData;
        const currentStock = res.data[0].stock;

        if (updatePro.sizeable) {
            const totalStock = parseInt(updatePro.stock_S || 0) + parseInt(updatePro.stock_M || 0) + parseInt(updatePro.stock_L || 0) + parseInt(updatePro.stock_XL || 0);
            if (totalStock > checkstock) {
                console.log("totalStock: " + totalStock);
                console.log("checkstock: " + checkstock);
                const sum = totalStock - checkstock;
                console.log("sum: " + sum);
                const newStock = parseInt(currentStock) + sum;
                newStockData = {
                    vendor: userId,
                    stock: newStock
                };
            } else {
                console.log("totalStock: " + totalStock);
                console.log("checkstock: " + checkstock);
                const sub = checkstock - totalStock;
                console.log("sub: " + sub);
                const newStock = parseInt(currentStock) - sub;
                newStockData = {
                    vendor: userId,
                    stock: newStock
                };
            }
        } else {
            // If the product is not sizable, check if the updated stock is greater than the original stock
            if (parseInt(updatePro.stock || 0) > checkstock) {
                console.log("totalStock: " + updatePro.stock);
                console.log("checkstock: " + checkstock);
                const sum = updatePro.stock - checkstock;
                console.log("sum: " + sum);
                const newStock = parseInt(currentStock) + sum;
                newStockData = {
                    vendor: userId,
                    stock: newStock
                };
            } else {
                console.log("totalStock: " + updatePro.stock);
                console.log("checkstock: " + checkstock);
                const sub = checkstock - updatePro.stock;
                console.log("sub: " + sub);
                const newStock = parseInt(currentStock) - sub;
                newStockData = {
                    vendor: userId,
                    stock: newStock
                };
            }
        }

        axiosInstance.post('http://127.0.0.1:8000/api/stockupdate/', newStockData, { headers })
            .then(res => {
                console.log('Stock updated successfully:', res.data);
            })
            .catch(error => {
                console.error('Error updating stock:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching current stock:', error);
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
                                        <option value="">Select Category</option>
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
