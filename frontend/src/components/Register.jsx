import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function Register({setToken, setIsAuth, token}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [])

    const register = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                fullname,
                email,
                phone,
                password
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.data) {
                    setToken(response.data.user_token)
                    setIsAuth(true)
                    navigate('/')
                } else {
                    setErrors(response.error.message)
                }
            })
    }

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__wrap">
                    <h2 className="auth__title">
                        Регистрация
                    </h2>
                    <form className="auth__form">
                        <input type="text" className="auth__input"
                               placeholder="Login"
                               value={username}
                               onChange={e => setUsername(e.target.value)}/>
                        <input type="text" className="auth__input"
                               placeholder="Fullname"
                               value={fullname}
                               onChange={e => setFullname(e.target.value)}/>
                        <input type="text" className="auth__input"
                               placeholder="Phone"
                               value={phone}
                               onChange={e => setPhone(e.target.value)}/>
                        <input type="text" className="auth__input"
                               placeholder="E-mail"
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>
                        <input type="text" className="auth__input"
                               placeholder="Password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        <p>{errors}</p>
                        <button type="submit" onClick={register}
                                className="auth__btn"> Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
