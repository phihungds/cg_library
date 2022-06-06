import React, {useState} from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

export default function AddLibrary() {
    const [newLibra, setNewLibra] = useState({})
    const [open, setOpen] = useState(false);
    const naviagte =useNavigate()

    function handleChange(event) {
        setNewLibra({
            ...newLibra, 
            [event.target.name]: event.target.value
        })
    }
    const handleClick = () => {
        
    }


    return (
        <div className="modal" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Add new library</h4>
                    </div>
                    <div className="modal-body">
                        <p>ádsadasd</p>
                    </div>
                    <div className="modal-
                    footer">
                        <button type="button" className="btn btn-primary" data-c></button>
                    </div>
                </div>
            </div>
        </div>
    )
}