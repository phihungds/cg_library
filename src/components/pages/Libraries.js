import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import '../../module-css/home.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import AddLibrary from "../buttons/addLibrary";
import Swal from "sweetalert2";

export default function Libraries() {
    const [libraries, setLibraries] = useState([])
    const [update, setUpdate] = useState(0)
    const [loading, setLoad] = useState(false)
    useEffect(() => {
        setLoad({loading: true})
        axios.get(`http://localhost:3001/libraries`)
            .then((res) => {
                setLibraries(res.data)  
            })
            .catch((err) => { console.log(err) })
            .finally(()=>{setLoad(false)})
            
    }, [update])


    const handleDelete = (libraryId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/libraries/${libraryId}`)
                .then(()=> {
                    setUpdate(value => value +1)
                })
                Swal.fire(
                    'Đã xóa',
                    `${libraries.name} đã bị xóa khỏi hệ thống`,
                    'success'
                )
            }
        })
    }

    

    return (
        <Layout>
            
                    
                    <h1>Danh sách thư viện</h1><AddLibrary />
                    <div className="libra-list">
                    {libraries.map((library, index) => (
                        <div className="card" key={index}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img className="card-img" alt="" src={require("../../photos/library-avt.jpg")} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="card-title">{library.name}</h3>
                                        <p className="card-text">Lĩnh vực: {library.field}</p>
                                        <p className="card-text">Thủ thư: {library.librarian}</p>
                                        <p className="card-text">Số lượng sách: {library.amount}</p>
                                        <button className="btn btn-primary">Xem chi tiết</button> 
                                        <button id={library.id} className="btn btn-primary" onClick={()=>{handleDelete(library.id)}}>Xóa bỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                    )}</div>
                
        </Layout>
    )
}