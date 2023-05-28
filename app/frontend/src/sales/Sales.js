import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Sales() {
    const [entity, setEntity] = useState([])
    const {id}=useParams()

    useEffect(()=>{
        loadEntity();
    }, []);

    const loadEntity=async()=>{
        const result=await axios.get('http://localhost:8080/sales')
        setEntity(result.data);
    }

    const deleteEntity=async (id)=>{
        await axios.delete('http://localhost:8080/sales/'+id)
        loadEntity()
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <h3>Продажи</h3>
            <Link className='btn btn-primary mb-4' to="/addsale">Добавить продажу</Link>

            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Покупатель</th>
                        <th scope="col">Дата продажи</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entity.map((s, index)=>(
                            <tr>
                                <th scope="row" key={s.id}>{s.id}</th>
                                <td>
                                    <Link className='label' to={"/viewconsumer/"+s.consumer.id}>{s.consumer.firstname} {s.consumer.lastname}</Link>
                                </td>
                                <td>{s.date}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2'to={'/viewsale/'+s.id}>Показать</Link>
                                    <Link className='btn btn-outline-primary mx-2'to={'/editsale/'+s.id}>Изменить</Link>
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteEntity(s.id)}>Удалить</button>
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
