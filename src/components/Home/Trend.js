import React from 'react';
import '../../CSS/elegant-icons.css';
import '../../CSS/font-awesome.min.css';
import '../../CSS/slicknav.min.css';
import '../../CSS/bootstrap.min.css';
import { useState } from 'react';
import { trendapi } from './TrendData';
import TrendItem from './TrendItem';

const Trend = () => {
  const [trend, setTrend] = useState(trendapi);

  return (
    <section className="trend spad">
      <div className="container">
        <div className="row">
          {trend.map((ter) => {
            return (
              <div className="col-lg-4 col-md-4 col-sm-6" key={ter.id}>
                <div className="trend__content">
                  <div className="section-title">
                    <h4>{ter.title}</h4>
                  </div>
                  <TrendItem />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trend;