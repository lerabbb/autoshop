import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewDetail() {

    const [entity,setEntity]=useState({
        name:"",
        producer:{
            id: 0,
            name: "",
        },
        guarantee:0,
        size:0,
    })

    const {id}=useParams();

    useEffect(()=>{
        loadEntity()
    }, []);
    useEffect(()=>{
        console.log(entity);
    }, [entity]);

    const loadEntity= async()=>{
        const result = await axios.get('http://localhost:8080/details/'+id)
        setEntity(result.data);
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о товаре</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Подробности о товаре: {entity.id}
                            <ul className='list-group list group-flush'>
                                <list className='list-group-item'>
                                    <b>Название:</b> {entity.name}
                                </list>
                                <Link className='list-group-item list-group-item-action' to={"/viewproducer/"+entity.producer.id}>
                                    <b>Производитель:</b> {entity.producer.name}
                                </Link>
                                <list className='list-group-item'>
                                    <b>Гарантия (мес.):</b> {entity.guarantee || "-"}
                                </list>
                                <list className='list-group-item'>
                                    <b>Размер:</b> {entity.size || "-"}
                                </list>
                                
                            </ul>
                        </div>
                    </div>
             
                <Link className='btn btn-primary my-2' to={'/details'}>Назад</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
