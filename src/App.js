
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery-ui-dist/jquery-ui.min.css';
import 'magnific-popup/dist/magnific-popup.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'slicknav/dist/slicknav.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductDetailes from './components/ProductDetailes';
function App() {
  return (
    
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<ProductDetailes />} />
            </Route>
          </Routes>
        </>
      </Router>
    );
  
}

export default App;
