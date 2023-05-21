import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import '../../module-css/home.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddBook from "../buttons/addBook.js";
import Swal from "sweetalert2";


export default function Books() {
    const [books, setBooks] = useState([])
    const [update, setUpdate] = useState(0)
    const [selected, setSelect] = useState()
    const [loading, setLoad] = useState(false)
    const thead =['ID', 'ISBN','Tên sách', 'Thư viện', 'Tình trạng', 'Mượn/Trả']

    useEffect(()=> {
        setLoad({loading: true})
        axios.get('http://localhost:3001/books')
        .then((res)=>{
            setBooks(res.data)
        })
        .catch((err) => { console.log(err) })
        .finally(()=>{setLoad(false)})
    },[update])


    const handleDelete = (bookId) => {
        
        Swal.fire({
            title: `Bạn chắc sẽ xóa sách này chứ? Hành động này không thể hoàn tác`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Đã xóa',
                    `Sách đã bị xóa khỏi hệ thống`,
                    'success'
                )
                axios.delete(`http://localhost:3001/books/${bookId}`)
                .then(()=> {
                    setUpdate(value => value +1)
                })
                
            }
        })
    }

    return (
        <Layout>
                <AddBook />
                <Table striped bordered hover className="table-books">
                    <thead>
                        <tr>
                            {thead.map((head)=>(
                                <th>{head}</th>
                                
                            ))}
                            <th>Sửa</th>
                                <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book)=>(
                            <tr>
                                <td>{book.id}</td>
                                <td>{book.isbn}</td>
                                <td>{book.name}</td>
                                <td>{book.library}</td>
                                <td>{book.status}</td>
                                <td>{book.borrows}</td>
                                <td><Button><i className="bi bi-pencil-fill"></i></Button></td>
                                <td><Button id={book.id} onClick={()=>handleDelete(book.id)}><i className="bi bi-x-lg"></i></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </Layout>
    )
}