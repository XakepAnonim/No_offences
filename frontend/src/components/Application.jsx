import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export default function Application({token}) {
    const [applications, setApplications] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        fetch('http://localhost:8000/api/application/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => setApplications(response.data))
    }, []);

    const printApplication = applications.map(application => {
        return (
            <div key={application.id} className="applications__card">
                <h4 className="applications__number">
                    {application.number_car}
                </h4>
                <p className="applications__context">
                    {application.description}
                </p>
                <p className="applications__status">
                    Статус: {application.status}
                </p>
            </div>
        )
    })

    return (
        <section className="applications">
            <div className="container">
                <div className="applications__wrap">
                    <h2 className="applications__title">
                        Мои заявления
                    </h2>
                    <div className="applications__row">
                        {applications.length ? {printApplication} : 'Заявлений нет'}
                    </div>
                </div>
            </div>
        </section>
    )
}
