import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Stock() {
    const [stock, setStock] = useState([])
    const {id}=useParams()

    useEffect(()=>{
        loadStock();
    }, []);

    const loadStock=async()=>{
        const result=await axios.get('http://localhost:8080/stock')
        setStock(result.data);
    }

    const deleteStock=async (id)=>{
        await axios.delete('http://localhost:8080/stock/'+id)
        loadStock()
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <h3>Склад</h3>
            <Link className='btn btn-primary mb-4' to="/addstock">Добавить данные</Link>

            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Ячейка</th>
                        <th scope="col">Товар</th>
                        <th scope="col">Поставка</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stock.map((s, index)=>(
                            <tr>
                                <th scope="row" key={s.id}>{s.id}</th>
                                <td>{s.cell.id}</td>
                                <td>{s.detail.name}</td>
                                <td>{s.order.id}</td>
                                <td>{s.count}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2'to={'/viewstock/'+s.id}>Показать</Link>
                                    <Link className='btn btn-outline-primary mx-2'to={'/editstock/'+s.id}>Изменить</Link>
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteStock(s.id)}>Удалить</button>
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
