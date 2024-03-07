import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../apis/config";

const Categorys = () => {

    const [categorys, setcategorys] = useState([]);


    useEffect(() => {
        axiosInstance
            .get('/API/categories/')
            .then((res) => setcategorys(res.data))
            .catch((err) => console.log(err));
    }, []);


    return (

                    <div className="col-lg-3 col-md-3">
                        <div className="shop__sidebar">
                            <div class="sidebar__categories">
                                <div class="section-title">
                                    <h4>Categories</h4>
                                </div>
                                <div class="categories__accordion">
                                    <div class="accordion" id="accordionExample">
                                    {categorys.map((category) => (
                                        <div class="card">
                                         
                                                <div class="card-heading active">
                                                    <a data-toggle="collapse" data-target="#collapseOne">{category.name}</a>
                                                </div>
                                           
                                            <div id="collapseOne" class="collapse show" data-parent="#accordionExample">
                                                <div class="card-body">
                                                    <ul>
                                                        <li><a href="#">Coats</a></li>
                                                        <li><a href="#">Jackets</a></li>
                                                        <li><a href="#">Dresses</a></li>
                                                        <li><a href="#">Shirts</a></li>
                                                        <li><a href="#">T-shirts</a></li>
                                                        <li><a href="#">Jeans</a></li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                        ))}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
    )
}

export default Categorys;
