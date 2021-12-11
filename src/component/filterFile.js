import React, { useState, useEffect } from 'react';
import Navbars from './navbar';
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './home.css';

const Filter = () => {

  const [info, setInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState();
  const { rating, category } = useParams();

  const getData = async () => {
    try {
      const res = await fetch(`/get/${rating}/${category}`);
      const result = await res.json();
      setInfo(result);
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
  }, [`${rating}/${category}`])

  return (
    <div>
      <div className='home'>
        <Navbars />
        <h4 style={{marginLeft:'40%'}}>Product List:</h4>
        <hr/>
        <br/>
        {
          // eslint-disable-next-line array-callback-return
          info.map((val) => {
            return <div className='container' key={val._id}>
              <Card className='row'>
                <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title><Link to={`/productdetail/${val._id}`} style={{textDecoration:'none', color:'blue'}}>{val.name}</Link></Card.Title>
                    <p>Category: {val.category}</p>
                    <hr/>
                    <p>Price : <b>₹</b> {val.price}</p>
                </Card.Body>
              </Card>
            </div>
          })
          }
      </div>
    </div>
  );
};

export default Filter;
