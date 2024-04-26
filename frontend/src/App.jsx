import './assets/css/style.css';
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Application from "./components/Application";
import Login from "./components/Login";
import Register from "./components/Register";
import ApplicationL from "./components/ApplicationL";
import Adminka from "./components/Adminka";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState('')

    return (
        <>
            <Header isAuth={isAuth} setIsAuth={setIsAuth} token={token}
                    setToken={setToken}/>
            <Routes>
                <Route path="/" element={
                    <Application token={token}/>
                }/>
                <Route path="/application" element={
                    <ApplicationL token={token}/>
                }/>
                <Route path="/signup" element={
                    <Register setIsAuth={setIsAuth}
                              setToken={setToken}/>
                }/>
                <Route path="/login" element={
                    <Login setIsAuth={setIsAuth}
                           setToken={setToken}/>
                }/>
                <Route path="/admin" element={
                    <Adminka token={token}/>
                }/>
            </Routes>
            <Footer/>
        </>
    )
}

export default App;
