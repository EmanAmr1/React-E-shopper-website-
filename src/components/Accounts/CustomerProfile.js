import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./CustomerProfile.css";
import { useDispatch } from "react-redux";
import { setTotalCount } from "../../store/slices/total";
import { resetWishTotalCount } from "../../store/slices/wishlist";
import { axiosInstance } from "../../apis/config";

function CustomerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [defaultUser, setDefaultUser] = useState(user);
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    birthdate: "",
  });
  const [isModified, setIsModified] = useState(false);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/cart/list/`, { headers })
      .then((res) => {
        dispatch(setTotalCount(res.data.total_items_count));
      })
      .catch((err) => console.log(err));

    axiosInstance
      .get(`/api/wishlist/list/`, { headers })
      .then((res) => {
        dispatch(resetWishTotalCount(res.data.wishlist_items.length));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      setDefaultUser(user);
      setUpdatedUser({
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        phone: user.phone,
        birthdate: user.birthdate,
      });
    }
  }, [user]);

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    axios
      .get("http://localhost:8000/api/profile/", { headers })
      .then((res) => {
        setUser(res.data.message);
        setUpdatedUser(res.data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch user error:", error);
        setLoading(false);
      });
  }, []);

  const handleFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setUpdatedUser({
      ...updatedUser,
      [fieldName]: fieldValue,
    });

    setIsModified(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault(); // Prevent default form submission

    const token = Cookies.get("token");
    const headers = {
      Authorization: `Token ${token}`,
    };

    console.log("Updated User:", updatedUser); // Log the updated user object

    axios
      .put("http://localhost:8000/api/profile/", updatedUser, { headers })
      .then((res) => {
        console.log("Update successful");
        setLoading(false);
        if (
          window.confirm("Your profile has been updated")
        ) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  const handleLogout = () => {
    const token = Cookies.get("token");
    Cookies.remove("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    axios
      .post("http://localhost:8000/api/logout/", null, { headers })
      .then(() => {
        console.log("Logout successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleDelete = () => {
    const token = Cookies.get("token");
    const confirmPassword = prompt(
      "To delete your account, please confirm by entering your password:"
    );
    if (!confirmPassword) {
      return;
    }

    // You may want to validate the password here before proceeding further

    const headers = {
      Authorization: `Token ${token}`,
    };
    Cookies.remove("token");
    axios
      .delete("http://localhost:8000/api/profile/", {
        headers,
        data: { password: confirmPassword },
      })
      .then((res) => {
        console.log("Delete successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
            <h4 className="card-title" style={{ fontFamily: 'Etaliq' }}>
  Welcome {user ? user.first_name : ""}
</h4>
              <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: '14px' }}>
  {user ? user.email : ""}
</h6>
              <ul className="list-unstyled">
                <li>
               <button  className="btn btn-link"   style={{ textDecoration: 'none' }}>
               <Link to="/VerifyOTP"  style={{ textDecoration: 'none' }}>
                    Change Password
                </Link>
               </button>
                </li>
                <li>
                
                  <button
                    className="btn btn-link text-danger"
                    onClick={handleDelete}
                    style={{ textDecoration: 'none' }}
                    
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={updatedUser.first_name}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={updatedUser.last_name}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={updatedUser.address}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={updatedUser.phone}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birthdate">Birthdate:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthdate"
                    name="birthdate"
                    value={updatedUser.birthdate}
                    onChange={handleFieldChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isModified}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default CustomerProfile;
