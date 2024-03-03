
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery-ui-dist/jquery-ui.min.css';
import 'magnific-popup/dist/magnific-popup.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'slicknav/dist/slicknav.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter} from 'react-router-dom';
import Router from './Router/router';


//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Layout from './components/Layout';
//import ProductDetails from './components/ProductDetails';
//import ProductList from './components/ProductList';
//import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
    <Router/>


      
    </BrowserRouter>
  );
};



export default App;

//<Router>
//<Routes>
//  
//    <Route path="productDetails/:id" element={<ProductDetails />} />
//    <Route path="ProductList" element={<ProductList />} />
//  </Route>
//  <Route path="*" element={<NotFound />} />
//</Routes>
//</Router>
