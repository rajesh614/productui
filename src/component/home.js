import React, { useState, useEffect } from 'react';
import Navbars from './navbar';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import './home.css';

const Home = () => {

  const [details, setDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState([]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
    try {
      const res = await fetch('/getdata');
      const result = await res.json();
      setDetails(result);
      console.log(result);
  } catch (err) {
      console.log(err);
  }
  }

  const handleView = async (id) => {
    // eslint-disable-next-line no-sequences
        let res = await fetch(`/getdata/${id}`)
        const data = await res.json();
        console.log(data);
        setDetail(data);
}

  useEffect(() => {
    handleView();
    getData();
  }, [])

  return (
    <div>
      <div className='home'>
        <Navbars />
        <h4 style={{marginLeft:'40%'}}>Product List:</h4>
        <hr/>
        <Button variant="info" style={{marginLeft:'41%'}} onClick={handleShow}>Filter Products</Button>
        <br/>
        <SearchBar placeholder="Enter Product Name" data={details} />
        <br/>
        
           {details.map((item)=>{
              return <div className='container' key={item._id}>
              <Card className='row' >
                <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title><Link to={`/productdetail/${item._id}`} style={{textDecoration:'none', color:'blue'}}>{item.name}</Link></Card.Title>
                    <p>Category: {item.category}</p>
                    <hr/>
                    <p>Price : <b>₹</b> {item.price}/-</p>
                </Card.Body>
              </Card>
            </div>
           })}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>FILTER : </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Category :</h5>
                <form value={category} onChange={(e)=> setCategory(e.target.value)}>
                <input type="radio" value="Clothes" name="fav_language" />&nbsp;
                <label for="categry"> Clothes</label><br/>
                <input type="radio" value="Electronics" name="fav_language" />&nbsp;
                <label for="categry"> Electronics</label><br/>
                <input type="radio" value="Eye_wear" name="fav_language" />&nbsp;
                <label for="categry"> Eye Wear</label><br/>
                <input type="radio" value="Furniture" name="fav_language" />&nbsp;
                <label for="categry"> Furniture</label>
                </form>
                <br/>
                <form value={rating} onChange={(e)=> setRating(e.target.value)}>
                  <h5>Rating :</h5>
                  <input type="radio" value="1" name="fav_language" />&nbsp;
                  <label for="rating"> 1 </label><br/>
                  <input type="radio" value="2" name="fav_language"/>&nbsp;
                  <label for="rating"> 2 </label><br/>
                  <input type="radio" value="3" name="fav_language" />&nbsp;
                  <label for="rating"> 3 </label><br/>
                  <input type="radio" value="4" name="fav_language" />&nbsp;
                  <label for="rating"> 4 </label><br/>
                  <input type="radio" value="5" name="fav_language" />&nbsp;
                  <label for="rating"> 5 </label>
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Link to={`/get/${rating}/${category}`}><Button variant="primary">
                Find Products
              </Button></Link>
            </Modal.Footer>
          </Modal>
      </div>
    </div>
  );
};

export default Home;
