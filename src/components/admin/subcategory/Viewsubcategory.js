import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../apis/config";
import swal from "sweetalert";

function Viewsubcategory() {
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Fetch subcategories when component mounts
    axiosInstance.get("/API/subcategories/").then((res) => {
      if (res.status === 200) {
        // After fetching subcategories, fetch parent categories for each subcategory
        Promise.all(
          res.data.map((subcategory) =>
            axiosInstance.get(`/API/categories/${subcategory.parentCategory}/`)
          )
        ).then((parentCategoryResponses) => {
          const subcategoryData = res.data.map((subcategory, index) => ({
            ...subcategory,
            parentCategory: parentCategoryResponses[index].data,
          }));
          setSubcategories(subcategoryData);
          setLoading(false);
        });
      }
    });
  }, []);

  const deleteSubcategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axiosInstance.delete(`/API/subcategories/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setSubcategories(subcategories.filter((subcategory) => subcategory.id !== id));
      } else if (res.data.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  let viewSubcategoryHTML = "";
  if (loading) {
    return <h4>Loading Subcategories...</h4>;
  } else {
    viewSubcategoryHTML = subcategories.map((subcategory) => (
      <tr key={subcategory.id}>
        <td>{subcategory.id}</td>
        <td>{subcategory.name}</td>
        <td>{subcategory.parentCategory.name}</td>
        <td>
          <Link to={`editSubcategory/${subcategory.id}`} className="btn btn-success btn-sm">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteSubcategory(e, subcategory.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header">
            <h4>Subcategory List</h4>
            <Link to="/addSubcategory" className="btn btn-primary btn-sm float-end">
              Add Subcategory
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Parent Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{viewSubcategoryHTML}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewsubcategory;