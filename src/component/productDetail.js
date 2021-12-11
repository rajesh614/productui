import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';

const BookDetail = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [detail, setDetail] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleView = async () => {
        // eslint-disable-next-line no-sequences
            let res = await fetch(`/getdata/${id}`)
            const data = await res.json();
            console.log(data);
            setDetail(data);
            setName(data.name);
            setAbout(data.about);
    }

    const handleDelete = async () => {
        // eslint-disable-next-line no-sequences
                const res = await fetch(`/deletedata/${id}`, {
                    method: "DELETE"
                });
                console.log(res);
                alert("deleted successfully")
    }

    const handleUpdate = async () => {
        let updateData = {name,about};
            let res = await fetch(`/updatedata/${id}`,{
                method:'PUT',
                body: JSON.stringify(updateData),
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application/json'
                },
                httpOnly:true
            })
            await res.json();
            alert(`data posted successfully.`);
    }

useEffect(() => {
    handleView();
}, [`${id}`])

    return (
        <div>
            <div className="container">
            <div className="container-fluid">
                <div className="container-heading">
                    <h3>Product Details</h3>
                </div>
                <div className="form-body">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title><b>{detail.name}</b></Card.Title>
                        <Card.Text>
                            <b>Category: </b>{detail.category}
                        </Card.Text>
                        <Card.Text>
                            <b>Details:</b> {detail.about}
                        </Card.Text>
                        <Card.Text>
                            <b>₹ .</b> {detail.price}/-
                        </Card.Text>
                        <Button variant="primary" onClick={handleShow}>Update</Button>&nbsp;
                        <Button variant="primary" onClick={handleDelete}>Delete</Button>
                    </Card.Body>
                    </Card>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Name</label>
                                <input type="text" class="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">About</label>
                                <input type="email" class="form-control" value={about} onChange={(e)=>setAbout(e.target.value)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
        </div>
    )
}

export default BookDetail;
