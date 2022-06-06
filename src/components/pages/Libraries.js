import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import '../../module-css/home.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import AddLibrary from "../buttons/addLibrary";

export default function Libraries() {
    const [libraries, setLibraries] = useState([])
    const [update, setUpdate] = useState(0)
    const [loading, setLoad] = useState(false)
    useEffect(() => {
        setLoad({loading: true})
        axios.get(`https://my-json-server.typicode.com/phihungds/cg-libraries-db/libraries`)
            .then((res) => {
                setLibraries(res.data)  
            })
            .catch((err) => { console.log(err) })
            .finally(()=>{setLoad(false)})
            
    }, [update])


    const handleDelete = () => {

    }

    

    return (
        <Layout>
            <div className="main-home">
                <div className="container">
                    
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
                </div>
            </div>
        </Layout>
    )
}