import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewProducer() {

    const [entity,setEntity]=useState({
        name:"",
        address:"",
        phoneNum:"",
        details:[],
    })

    const {id}=useParams();

    useEffect(()=>{
        loadEntity()
    }, []);

    const loadEntity= async()=>{
        const result = await axios.get('http://localhost:8080/producers/'+id)
        setEntity(result.data);
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о производителе</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Подробности о производителе: {entity.id}
                            <ul className='list-group list group-flush'>
                                <list className='list-group-item'>
                                    <b>Название:</b> {entity.name}
                                </list>
                                <list className='list-group-item'>
                                    <b>Адрес:</b> {entity.address}
                                </list>
                                <list className='list-group-item'>
                                    <b>Номер телефона:</b> {entity.phoneNum}
                                </list>
                                <list className='list-group-item'>
                                    <b>Товары:</b> {entity.details}
                                </list>
                            </ul>
                        </div>
                    </div>
             
                <Link className='btn btn-primary my-2' to={'/producers'}>Назад</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
