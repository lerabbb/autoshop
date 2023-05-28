import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Vendors() {
    const [vendors, setVendors] = useState([])
    const {id}=useParams()

    useEffect(()=>{
        loadVendors();
    }, []);

    const loadVendors=async()=>{
        const result=await axios.get('http://localhost:8080/vendors')
        setVendors(result.data);
    }

    const deleteVendor=async (id)=>{
        await axios.delete('http://localhost:8080/vendors/'+id)
        loadVendors()
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <h3>Поставщики</h3>
            <Link className='btn btn-primary mb-4' to="/addvendor">Добавить поставщика</Link>

            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Название</th>
                        <th scope="col">Категория</th>
                        <th scope="col">Адрес</th>
                        <th scope="col">Контакты</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendors.map((vendor, index)=>(
                            <tr>
                                <th scope="row" key={vendor.id}>{vendor.id}</th>
                                <td>{vendor.name}</td>
                                <td>{vendor.type.name}</td>
                                <td>{vendor.address}</td>
                                <td>{vendor.phoneNum}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2'to={'/viewvendor/'+vendor.id}>Показать</Link>
                                    <Link className='btn btn-outline-primary mx-2'to={'/editvendor/'+vendor.id}>Изменить</Link>
                                    <button className='btn btn-danger mx-2' onClick={()=>deleteVendor(vendor.id)}>Удалить</button>
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
