import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbars = () => {
  return (
    <>
      <div className='header' style={{boxShadow:'3px 3px 4px #888888'}}>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='/'> &emsp; <b>PRODUCTS</b> </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/createbook'>Create Product</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Navbars;
