import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../../module-css/login-style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {

    const naviagte = useNavigate()
    const [form, setForm] = useState({})
    const [users, setUser] = useState([])

    useEffect(() => {
        axios.get(`https://my-json-server.typicode.com/phihungds/cg-libraries-db/users`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => { console.log(err) })
            
    }, [])

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const handleSubmit = () => {
        const isUser = users.every(function(user) {
            return user.email === form.email && user.password === form.password
        })
        if (isUser) {
            Swal.fire(
                'Access success!',
                'You are in',
                'success'
              )
            setTimeout(()=>{naviagte('/home')}, 500)
            
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Access denied',
                text: 'Email or password is not correct',
              })
        }
    }
    return (
        <div className="main">
        <div className="wrapper">
            <div className="inner">
                <form>
                    <h1>CG LIBRARIES</h1>
                    {/* <i class="bi bi-book-half"></i> */}
                    <h3>Log In</h3>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check1"
                            />
                            <label className="custom-control-label" htmlFor="check1"> Remember me</label>

                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="button" className="btn btn-primary"
                        onClick={handleSubmit}>Submit</button>
                    </div>
                    <p className="forgot-pass text-right"><a href="#"> Forgot password ?</a></p>
                </form></div>
        </div></div>
    )

}