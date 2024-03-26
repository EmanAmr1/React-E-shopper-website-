import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../apis/configpaln';
import { Card, Button } from 'react-bootstrap';
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
const Vendorplan = () => {
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };
  

     return(
        <>
        </>
    );
};

export default Vendorplan;
