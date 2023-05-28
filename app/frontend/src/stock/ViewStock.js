import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewStock() {

    const [entity,setEntity]=useState({
        cell: { id: "" , size: 0},
        order: { id: "" },
        detail: {
            id: "",
            name: "",
        },
        count: 0
    })

    const {id}=useParams();

    useEffect(()=>{
        loadEntity()
    }, []);
    useEffect(()=>{
        console.log(entity);
    }, [entity]);

    const loadEntity= async()=>{
        const result = await axios.get('http://localhost:8080/stock/'+id)
        setEntity(result.data);
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о товаре на складе №{id}</h2>

                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list group-flush'>
                                <list className='list-group-item'>
                                    <b>Ячейка: </b> 
                                    <label> {entity.cell.id} (вместимость:  {entity.cell.size}) </label>
                                </list>
                                <Link 
                                    className='list-group-item list-group-item-action' 
                                    to={"/vieworder/"+entity.order.id}
                                >
                                    <b>Поставка: </b> {entity.order.id}
                                </Link>
                                <Link 
                                    className='list-group-item list-group-item-action'
                                    to={"/viewdetail/"+entity.detail.id}
                                >
                                    <b>Товар: </b> {entity.detail.name}
                                </Link>
                                <list className='list-group-item'>
                                    <b>Количество:</b> {entity.size || "-"}
                                </list>
                                
                            </ul>
                        </div>
                    </div>
             
                <Link className='btn btn-primary my-2' to={'/stock'}>Назад</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
