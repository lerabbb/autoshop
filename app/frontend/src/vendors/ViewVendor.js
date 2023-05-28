import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewVendor() {

    const [entity,setEntity]=useState({
        name:"",
        address:"",
        phoneNum:"",
        discount:0,
        contracts:0,
        guarantee:0,
        deliveryTime:0,
        type: {
            id: 1
        }
    })

    const {id}=useParams();

    useEffect(()=>{
        loadEntity()
    }, []);

    const loadEntity= async()=>{
        const result = await axios.get('http://localhost:8080/vendors/'+id)
        setEntity(result.data);
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о поставщике</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Подробности о поставщике: {entity.id}
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
                                    <b>Категория:</b> {entity.type.name}
                                </list>
                                <list className='list-group-item'>
                                    <b>Сидка:</b> {entity.discount}
                                </list>
                                <list className='list-group-item'>
                                    <b>Наличие документов:</b> {(entity.contracts && "есть") || "нет"}
                                </list>
                                <list className='list-group-item'>
                                    <b>Гарантия (мес.):</b> {entity.guarantee || "-"}
                                </list>
                                <list className='list-group-item'>
                                    <b>Время поставки (дни):</b> {entity.deliveryTime}
                                </list>
                                
                            </ul>
                        </div>
                    </div>
             
                <Link className='btn btn-primary my-2' to={'/vendors'}>Назад</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
