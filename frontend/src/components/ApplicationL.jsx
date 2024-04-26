import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function ApplicationL({token}) {
    const [number_car, setNumber_car] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    const postApplication = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/application/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({number_car, description})
        })
            .then(response => response.json())
            .then(response => {
                if (response.data) {
                    navigate('/')
                } else {
                    setErrors('Формат "А000АА 000"')
                }
            })
    }

    return (
        <section className="apps">
            <div className="container">
                <div className="apps__wrap">
                    <h2 className="apps__title">
                        Подача заявления
                    </h2>
                    <form className="applications__form">
                        <p>{errors}</p>
                        <input type="text" className="apps__input"
                               placeholder="A000AA 000"
                               value={number_car}
                               onChange={e => setNumber_car(e.target.value)}/>
                        <input type="text" className="apps__input"
                               placeholder="Text"
                               value={description}
                               onChange={e => setDescription(e.target.value)}/>
                        <button type="submit" onClick={postApplication}
                                className="apps__btn">
                            Подать заявление
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
