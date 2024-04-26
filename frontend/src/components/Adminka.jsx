import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function Adminka({token}) {
    const [applications, setApplications] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    useEffect(() => {
        fetch('http://localhost:8000/api/admin/applications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => setApplications(response.data))
    }, [token]);

    const acceptStatus = (id) => {
        fetch(`http://localhost:8000/api/admin/application/accept/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setApplications(prevApplications => {
                        return prevApplications.map(application => {
                            if (application.id === id) {
                                return {
                                    ...application,
                                    status: 'Подтвержено'
                                };
                            }
                            return application;
                        });
                    });
                } else {
                    console.error('Ошибка при изменении статуса заявления');
                }
            })
    }

    const cancelStatus = (id) => {
        fetch(`http://localhost:8000/api/admin/application/cancel/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setApplications(prevApplications => {
                        return prevApplications.map(application => {
                            if (application.id === id) {
                                return {
                                    ...application,
                                    status: 'Отклонено'
                                };
                            }
                            return application;
                        });
                    });
                } else {
                    console.error('Ошибка при изменении статуса заявления');
                }
            })
    }

    const printApplication = applications.map(application => {
        return (
            <div className="applications__card" key={application.id}>
                <p className="applications__number">
                    {application.number_car}
                </p>
                <p className="applications__context">
                    {application.description}
                </p>
                <p className="applications__status">Статус: <span>
                    {application.status}
                </span></p>
                <button type="submit"
                        onClick={() => acceptStatus(application.id)}
                        className="accept__btn">✅
                </button>
                <button type="submit"
                        onClick={() => cancelStatus(application.id)}
                        className="cancel__btn">❌
                </button>
            </div>
        )
    })

    return (
        <section className="applications">
            <div className="container">
                <div className="applications__wrap">
                    <h2 className="applications__title">
                        Заявления
                    </h2>
                    <div className="applications__row">
                        {printApplication}
                    </div>
                </div>
            </div>
        </section>
    )
}
