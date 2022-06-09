import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from "react-bootstrap";


export default function AddBook() {
    const [newBook, setNewBook] = useState({})
    const [open, setOpen] = useState(false);
    const [libraries, setLibraries] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/libraries')
        .then((res) => {setLibraries(res.data)})
        .catch((err) => { throw err })
    },[])

    const handleChange = (event) => {
        setNewBook({
            ...newBook,
            [event.target.name]: event.target.value
        })
    } 

    const handleClose = () => {setOpen(false)}
    const handleOpen = () => {setOpen(true)}

    const handleClick = () => {
        axios.post('http://localhost:3001/books', newBook)
            .then((res)=>{
                Swal.fire(
                    'Hoàn tất',
                    ` ${newBook.name} đã được thêm vào ${newBook.library} !`,
                    'success'
                )
                setOpen(false)
            })
            .catch((err) => { throw err })
            .finally(() => { window.location.reload(false) })
        
    }

    return (
        <>
        <Button variant="primary" onClick={handleOpen}>
            + Thêm sách mới
        </Button>

        <Modal show={open} size="lg" onHide={handleClose}>
            <ModalHeader><h2>Thông tin sách mới</h2></ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3" >
                        <FormLabel>Tên sách</FormLabel>
                        <FormControl name="name" onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Tình trạng</FormLabel>
                        <FormControl name="status" onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Thư viện </FormLabel>
                        <FormSelect onClick={handleChange} name="library">
                            {libraries.map((library, index)=> (
                                <option key={index} value={library.name}>{library.name}</option>
                            ))}
                        </FormSelect>
                    </FormGroup>

                    <Row className="mb-3">
                        <FormGroup as={Col}>
                            <FormLabel>ID</FormLabel>
                            <FormControl name="id" type="number" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>ISBN</FormLabel>
                            <FormControl type="number" name="isbn" onChange={handleChange}/>
                        </FormGroup>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary"  onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClick}>Save Changes</Button>
            </ModalFooter>
        </Modal>
        </>
    )
}