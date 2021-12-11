import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/home';
import Filter from './component/filterFile';
import CreateProduct from './component/createProduct';
import ProductDetail from './component/productDetail';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/get/:rating/:category' element={<Filter />} />
        <Route exact path='/createbook' element={<CreateProduct />} />
        <Route exact path='/productdetail/:id' element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
