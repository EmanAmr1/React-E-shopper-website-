import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./CustomerProfile.css";
import { useDispatch } from "react-redux";
import { setTotalCount } from "../../store/slices/total";
import { resetWishTotalCount } from "../../store/slices/wishlist";
import { axiosInstance } from "../../apis/config";

// Function to get status text based on status code
function getStatusText(status) {
  switch (status) {
    case "D":
      return "Delivered";
    case "S":
      return "Shipped";
    case "P":
      return "Pending";
    default:
      return "Unknown";
  }
}

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
  const [userOrders, setUserOrders] = useState([]);
  const [showProfile, setShowProfile] = useState(true);
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

    axiosInstance
      .get("/API/userorders/", { headers })
      .then((res) => {
        setUserOrders(res.data.orders);
      })
      .catch((error) => {
        console.error("Fetch user orders error:", error);
      });
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
        if (window.confirm("Your profile has been updated")) {
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
    <div
      className="container-fluid pl-0"
      style={{ backgroundColor: "#f3f4f8" }}
    >
      <div className="row">
        <div className="col-md-3">
          <div className="card1">
            <div className="card-body px-5">
              <h5 className="card-title font-weight-bold">
                {user ? user.first_name : ""} !
              </h5>
              <h6 className="card-subtitle text-muted">
                {user ? user.email : ""}
              </h6>
              <hr />
              <ul className="list-unstyled" style={{ paddingLeft: 0 }}>
                <li className="mt-2">
                  <button
                    className="btn btn-link sidebar-btn"
                    style={{
                      textDecoration: "none",
                      
                      textAlign: "start",
                    }}
                  >
                    <Link
                      to="/VerifyOTP"
                      style={{ textDecoration: "none", textAlign: "start" }}
                    >
                      <i
                        className="fas fa-key mr-2"
                        style={{ color: "rgb(227, 192, 28)", fontSize: "20px" }}
                      ></i>
                      <span
                        className="align-text-start"
                        style={{
                          fontSize: "17px",
                          color: "rgb(126, 133, 155)",
                        }}
                      >
                        Change Password
                      </span>
                    </Link>
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    className="btn btn-link sidebar-btn text-danger"
                    onClick={handleDelete}
                    style={{
                      textDecoration: "none",
                    
                      textAlign: "start",
                    }}
                  >
                    <i
                      className="fas fa-trash-alt mr-2"
                      style={{ color: "rgb(227, 192, 28)", fontSize: "20px" }}
                    ></i>
                    <span
                      className="align-text-start"
                    
                      style={{ fontSize: "17px", color: "rgb(126, 133, 155)" }}
                    >
                      Delete Account
                    </span>
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    className="btn btn-link sidebar-btn"
                    onClick={() => setShowProfile(true)}
                    style={{
                      textDecoration: "none",
                     
                      textAlign: "start",
                    }}
                  >
                    <i
                      className="fas fa-user mr-2"
                      style={{ color: "rgb(227, 192, 28)", fontSize: "20px" }}
                    ></i>
                    <span
                      className="align-text-start"
                      style={{ fontSize: "17px", color: "rgb(126, 133, 155)" }}
                    >
                      Profile
                    </span>
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    className="btn btn-link sidebar-btn"
                    onClick={() => setShowProfile(false)}
                    style={{
                      textDecoration: "none",
                      
                      textAlign: "start",
                    }}
                  >
                    <i
                      className="fas fa-list-alt mr-2"
                      style={{ color: "rgb(227, 192, 28)", fontSize: "20px" }}
                    ></i>
                    <span
                      className="align-text-start"
                      style={{fontSize: "17px", color: "rgb(126, 133, 155)" }}
                    >
                      Orders
                    </span>
                  </button>
                </li>
              </ul>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <div className="col-md-9  py-4">
          {showProfile ? (
            <div className="card">
              <div className="card-body px-5">
                <form onSubmit={handleUpdate}>
                  <span style={{ fontWeight: "semibold", fontSize: "20px" }}>
                    Profile Info
                  </span>
                  <div className="form-group mt-3">
                    <label htmlFor="first_name ">First Name:</label>
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
          ) : (
            <div className="card mt-4">
              <div className="card-body px-5">
              <span style={{ fontWeight: "semibold", fontSize: "20px" }}>
                    Your Orders
                  </span>
                <div className="list-group mt-3">
                  {userOrders.map((order) => (
                    <div key={order.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">Order Code: {order.id}</h6>
                        <small>Status: {getStatusText(order.status)}</small>
                      </div>
                      <ul className="list-group">
                        {order.orderItems.map((item, index) => (
                          <li key={index} className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                              <h6 className="mb-1">{item.name}</h6>
                              <span className="badge badge-primary badge-pill">
                                ${item.price}
                              </span>
                            </div>
                            <small>Quantity: {item.quantity}</small>
                          </li>
                        ))}
                      </ul>
                      <div className="d-flex w-100 justify-content-between mt-2">
                        <div>
                          <strong>Total Price:</strong> ${order.total_price}
                        </div>
                        <div>
                          <button className="btn btn-primary btn-sm">
                            Track Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="my-0" />
    </div>
  );
}

export default CustomerProfile;
