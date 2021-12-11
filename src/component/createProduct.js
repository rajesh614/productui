import React, {useState} from 'react';
import Navbars from './navbar';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-sequences
    if(!name, !about, !price, !rating, !category){
      alert('fill all the fields');
    } else {
      let bookData = {name, about, price, rating, category};
      let res = await fetch('/postdata', {
        method:'POST',
        body: JSON.stringify(bookData),
            headers:{
              "Content-Type":'application/json',
              "Accept":'application/json'
            },
        httpOnly:true
      })
      await res.json();
      alert(`data posted successfully.`);
      setName("");
      setAbout("");
      setPrice("");
      setRating("");
      setCategory("");
      navigate("/");
    }
  }

  return (
    <>
      <div className='body'>
        <Navbars />
      </div>
      <div className='container' style={{width:'50%'}}>
        <h4>Enter Product Details :</h4>
        <hr/>
        <Form method='POST'>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Product Name :</Form.Label>
            <Form.Control type='text' placeholder='Enter a Product Name' value={name} onChange={(e)=> setName(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicAbout'>
            <Form.Label>About :</Form.Label>
            <Form.Control type='text' placeholder='Enter About Product' value={about} onChange={(e)=> setAbout(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicAbout'>
            <Form.Label>Price :</Form.Label>
            <Form.Control type='text' placeholder='Enter The Price' value={price} onChange={(e)=> setPrice(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicAbout'>
            <Form.Label>Rating :</Form.Label>
            <Form.Control type='text' placeholder='Enter Rating' value={rating} onChange={(e)=> setRating(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicAbout'>
            <Form.Label>Category :</Form.Label>
            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e)=> setCategory(e.target.value)}/>
          </Form.Group>

          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateProduct;
