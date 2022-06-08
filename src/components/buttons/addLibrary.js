import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from "react-bootstrap";

export default function AddLibrary() {
    const [newLibra, setNewLibra] = useState({})
    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState([])
    
    useEffect(()=>{
        axios.get('http://localhost:3001/fields')
        .then((res) => {setFields(res.data)})
        .catch((err) => { throw err })
    },[])

    function handleChange(event) {
        setNewLibra({
            ...newLibra, 
            [event.target.name]: event.target.value
        })
    }
    const handleClick = () => {
        axios.post('http://localhost:3001/libraries', newLibra)
            .then((res)=>{
                Swal.fire(
                    'Hoàn tất',
                    `Thư viện ${newLibra.content} đã được thêm !`,
                    'success'
                )
                setOpen(false)
            })
            .catch((err) => { throw err })
            .finally(() => { window.location.reload(false) })
        
    }
    const handleClose = () => {setOpen(false)}
    const handleOpen = () => {setOpen(true)}

    
    return (
        <>
        <Button variant="primary" onClick={handleOpen}>
            + Tạo thư viện mới
        </Button>

        <Modal show={open} size="lg" onHide={handleClose}>
            <ModalHeader><h2>Thông tin thư viện mới</h2></ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3" >
                        <FormLabel>Tên thư viện</FormLabel>
                        <FormControl name="name" onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Tên thủ thư</FormLabel>
                        <FormControl name="librarian" onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Lĩnh vực, thể loại</FormLabel>
                        <FormSelect onClick={handleChange} name="field">
                            {fields.map((field, index)=> (
                                <option key={index} value={field.content}>{field.content}</option>
                            ))}
                        </FormSelect>
                    </FormGroup>

                    <Row className="mb-3">
                        <FormGroup as={Col}>
                            <FormLabel>ID</FormLabel>
                            <FormControl name="id" type="number" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Số lượng sách</FormLabel>
                            <FormControl type="number" name="amount" onChange={handleChange}/>
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