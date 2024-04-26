import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function Login({setToken, setIsAuth, token}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [])

    const login = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
            .then(response => response.json())
            .then(response => {
                    if (response.data) {
                        setToken(response.data.user_token)
                        setIsAuth(true)
                        navigate('/')
                    } else {
                        setErrors(response.error.message)
                    }
                }
            )
    }

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__wrap">
                    <h2 className="auth__title">
                        Авторизация
                    </h2>
                    <form className="auth__form">
                        <input type="text" className="auth__input"
                               placeholder="Login"
                               value={username}
                               onChange={e => setUsername(e.target.value)}/>
                        <input type="text" className="auth__input"
                               placeholder="Password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        <p>{errors}</p>
                        <button type="submit" onClick={login}
                                className="auth__btn"> Войти
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
