import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import '../../module-css/layout.css'
import '../../module-css/home.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from "react-bootstrap";

export default function Layout({ children }) {
    const pages = ['home', 'libraries', 'books', 'borrows']
    const naviagte = useNavigate()
    return (
        <>
            <div className="nav-bar">
                <ul className="nav nav-pills nav-fill">
                    {pages.map((page) => (
                        <li
                            key={page}
                            onClick={() => { naviagte(`/${page}`) }}
                            className='nav-item'
                        > <a className="nav-link primary">{page}</a>

                        </li>

                    ))}
                    <li className="nav-item"><a className="nav-link primary"><i className="bi bi-person-circle"> Account</i></a></li>
                </ul>

            </div>
            <div className="main-home">
                <div className="container">{children}</div>
            </div>
            <footer>

            </footer>
        </>
    )
}