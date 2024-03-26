import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { Link } from 'react-router-dom';
import { axiosInstance } from "../../../apis/config";
import swal from 'sweetalert';

function EditCategory() { 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState({});
    const [error, setError] = useState([]);
    const { id } = useParams(); 

    useEffect(() => {
        axiosInstance.get(`/API/categories/${id}`).then(res => { // Use id from useParams()
            if (res.data.status === 200) {
                setCategory(res.data);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                // history.push('/viewCategory');
            }
            setLoading(false);
        });
    }, [id]); // Use id from useParams()
    console.log(categoryInput)
    const handleInput = (event) => {
        const { name, value, files } = event.target;
    
        setCategory({
          ...categoryInput,
          [name]: files ? files[0] : value, // Handling file uploads properly
        });
      };
    const updateCategory = (e) => {
        e.preventDefault();
        const data = categoryInput;
        axiosInstance.put(`/API/categories/${id}/`, data).then(res => { // Use id from useParams()
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 422) {
                swal("All fields are mandatory", "", "error");
                setError(res.data.errors);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/viewCategory');
            }
        });
    }

    if (loading) {
        return <h4>Loading Edit Category...</h4>
    }
    return (
        <>
            <div className="container px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Edit Category
                            <Link to="/viewCategory" className="btn btn-primary btn-sm float-end">BACK</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateCategory}>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                    <label>Image <span className='text-danger'>*</span></label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleInput}
                      className="form-control"
                    />
                    <small className='text-danger'>{error.image}</small>
                  </div>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                        <small className="text-danger">{error.name}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCategory;