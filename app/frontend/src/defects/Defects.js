import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Defects() {
    const [entity, setEntity] = useState([])
    const {id}=useParams()

    useEffect(()=>{
        loadEntity();
    }, []);

    const loadEntity=async()=>{
        const result=await axios.get('http://localhost:8080/defects')
        setEntity(result.data);
    }

    const deleteEntity=async (id)=>{
        await axios.delete('http://localhost:8080/defects/'+id)
        loadEntity()
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <h3>Дефекты</h3>
            <Link className='btn btn-primary mb-4' to="/adddefect">Добавить дефект</Link>

            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Продажа</th>
                        <th scope="col">Ячейка</th>
                        <th scope="col">Товар</th>
                        <th scope="col">Поставка</th>
                        <th scope="col">Компенсация от поставщика (руб.)</th>
                        <th scope="col">Компенсация покупателю (руб.)</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entity.map((s, index)=>(
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>

                                <td>{s.sale.id}</td>
                                <td>{s.stockDetail.cell.id}</td>
                                <td>
                                    <Link className='label' to={'/viewdetail/'+s.stockDetail.detail.id}>
                                        {s.stockDetail.detail.name}
                                    </Link>
                                </td>
                                <td>{s.stockDetail.order.id}</td>
                                <td>{s.refundFromVendor}</td>
                                <td>{s.refundToConsumer}</td>
                                <td>{s.count}</td>
                                <td>
                                    <Link className='btn btn-outline-primary mx-2'to={'/editdefect?sale='+s.sale.id+"&sd="+s.stockDetail.id}>Изменить</Link>
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteEntity(s.sale.id)}>Удалить</button>
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
