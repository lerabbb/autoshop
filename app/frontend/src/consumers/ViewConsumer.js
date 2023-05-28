import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewConsumer() {

    const [consumer,setConsumer]=useState({
        firstname:"",
        lastname:"",
        patronymic:"",
        phoneNum:"",
    })

    const {id}=useParams();

    useEffect(()=>{
        loadConsumer()
    }, []);

    const loadConsumer= async()=>{
        const result = await axios.get('http://localhost:8080/consumers/'+id)
        setConsumer(result.data);
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о покупателе</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Подробности о покупателе: {consumer.id}
                            <ul className='list-group list group-flush'>
                                <list className='list-group-item'>
                                    <b>Имя:</b> {consumer.firstname}
                                </list>
                                <list className='list-group-item'>
                                    <b>Фамилия:</b> {consumer.lastname}
                                </list>
                                <list className='list-group-item'>
                                    <b>Отчество:</b> {consumer.patronymic}
                                </list>
                                <list className='list-group-item'>
                                    <b>Номер телефона:</b> {consumer.phoneNum}
                                </list>
                            </ul>
                        </div>
                    </div>
             
                <Link className='btn btn-primary my-2' to={'/consumers'}>Назад</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
