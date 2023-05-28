import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Consumers() {
    const [consumers, setConsumers] = useState([])

    const {id}=useParams()

    useEffect(()=>{
        loadConsumers();
    }, []);

    const loadConsumers=async()=>{
        const result=await axios.get('http://localhost:8080/consumers')
        setConsumers(result.data);
    }

    const deleteUser=async (id)=>{
        await axios.delete('http://localhost:8080/consumers/'+id)
        loadConsumers()
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <h3>Покупатели</h3>
            <Link className='btn btn-primary' to="/addconsumer">Добавить покупателя</Link>

            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Фамилия</th>
                        <th scope="col">Отчество</th>
                        <th scope="col">Номер телефона</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        consumers.map((consumer, index)=>(
                            <tr>
                                <th scope="row" key={consumer.id}>{consumer.id}</th>
                                <td>{consumer.firstname}</td>
                                <td>{consumer.lastname}</td>
                                <td>{consumer.patronymic}</td>
                                <td>{consumer.phoneNum}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2'
                                        to={'/viewconsumer/'+consumer.id}>Показать</Link>
                                    <Link className='btn btn-outline-primary mx-2'
                                        to={'/editconsumer/'+consumer.id}
                                    >Изменить</Link>
                                    <button className='btn btn-danger mx-2' 
                                        onClick={()=>deleteUser(consumer.id)}
                                    >Удалить</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
