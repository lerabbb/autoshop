import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Details() {
    const [details, setDetails] = useState([])
    const {id}=useParams()

    useEffect(()=>{
        loadDetails();
    }, []);

    const loadDetails=async()=>{
        const result=await axios.get('http://localhost:8080/details')
        setDetails(result.data);
    }

    const deleteDetail=async (id)=>{
        await axios.delete('http://localhost:8080/details/'+id)
        loadDetails()
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <h3>Товары</h3>
            <Link className='btn btn-primary mb-4' to="/adddetail">Добавить товар</Link>

            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Название</th>
                        <th scope="col">Производитель</th>
                        <th scope="col">Гарантия</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details.map((d, index)=>(
                            <tr>
                                <th scope="row" key={d.id}>{d.id}</th>
                                <td>{d.name}</td>
                                <td>{d.producer.name}</td>
                                <td>{d.guarantee || '-'}</td>
                                <td>{d.size}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2'to={'/viewdetail/'+d.id}>Показать</Link>
                                    <Link className='btn btn-outline-primary mx-2'to={'/editdetail/'+d.id}>Изменить</Link>
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteDetail(d.id)}>Удалить</button>
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
