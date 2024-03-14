import React, { useState, useEffect } from 'react';
import { bannerapi } from './api'; // Assuming bannerapi is properly defined

const Banner = () => {
    const [banners, setBanners] = useState(bannerapi);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000); // Change slide every 5 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <section className="banner set-bg" style={{ backgroundImage: `url(${banners[currentIndex].image})` }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 col-lg-8 m-auto">
                        <div className="banner__slider owl-carousel">
                            {banners.map((banner, index) => (
                                <div key={index} className={`banner__item ${index === currentIndex ? 'active' : ''}`}>
                                    <div className="banner__text">
                                        <span>{banner.title}</span> {/* Replace static text with dynamic title */}
                                        <h1>{banner.title}</h1>
                                        <a href="#">Shop now</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;