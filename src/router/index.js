import { BrowserRouter, Route, Routes } from "react-router-dom";
import Books from "../components/pages/Books";
import Home from "../components/pages/Home";
import Libraries from "../components/pages/Libraries";
import Login from "../components/pages/Login";


export default function Index() {
    return (
        <BrowserRouter>
            <div className="main-router-place">
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/libraries" element={<Libraries />} />
                    <Route exact path="/books" element={<Books />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}