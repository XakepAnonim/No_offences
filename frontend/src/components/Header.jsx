import {Link} from "react-router-dom";
import logo from '../assets/css/img/logo.png'
import {useEffect, useState} from "react";

export default function Header({isAuth, setIsAuth, token, setToken}) {
    const [isSuperuser, setIsSuperuser] = useState(false);

    const logout = () => {
        fetch('http://localhost:8000/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        setToken('')
        setIsAuth(false)
    }

    useEffect(() => {
        if (token) {
            fetchUserInfo();
        }
    }, [token]);

    const fetchUserInfo = () => {
        fetch('http://localhost:8000/api/get_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setIsSuperuser(data.is_superuser);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    };

    return (
        <header>
            <div className="container">
                <div className="header__wrap">
                    <div className="header__img">
                        <img src={logo} alt="logo"
                             className="header__logo"/>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__menu">
                            {isAuth ? <>
                                <li className="header__item">
                                    <Link to="/"
                                          className="header__link">
                                        Заявления
                                    </Link>
                                </li>
                                <li className="header__item">
                                    <Link to="/application"
                                          className="header__link">
                                        Создать зявление
                                    </Link>
                                </li>
                                {isSuperuser && (
                                    <li className="header__item">
                                        <Link to="/admin"
                                              className="header__link">
                                            Панель админа
                                        </Link>
                                    </li>
                                )}
                                <li className="header__item">
                                    <Link to="/" onClick={logout}
                                          className="header__link">
                                        Выйти
                                    </Link>
                                </li>
                            </> : <>
                                <li className="header__item">
                                    <Link to="/login"
                                          className="header__link">
                                        Войти
                                    </Link>
                                </li>
                                <li className="header__item">
                                    <Link to="/signup"
                                          className="header__link">
                                        Регистрация
                                    </Link>
                                </li>
                            </>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
