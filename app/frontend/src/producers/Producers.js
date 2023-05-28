import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Producers() {
    const [producers, setProducers] = useState([])

    const {id}=useParams()

    useEffect(()=>{
        loadProducers();
    }, []);

    const loadProducers=async()=>{
        const result=await axios.get('http://localhost:8080/producers')
        setProducers(result.data);
    }

    const deleteProducer=async (id)=>{
        await axios.delete('http://localhost:8080/producers/'+id)
        loadProducers()
    }

    return (
    <div className='container'>
        <div className='py-4'>
            <h3>Производители</h3>
            <Link className='btn btn-primary' to="/addproducer">Добавить производителя</Link>

            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Название</th>
                        <th scope="col">Адрес</th>
                        <th scope="col">Номер телефона</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        producers.map((producer, index)=>(
                            <tr>
                                <th scope="row" key={producer.id}>{producer.id}</th>
                                <td>{producer.name}</td>
                                <td>{producer.address}</td>
                                <td>{producer.phoneNum}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2'
                                        to={'/viewproducer/'+producer.id}>Показать</Link>
                                    <Link className='btn btn-outline-primary mx-2'
                                        to={'/editproducer/'+producer.id}
                                    >Изменить</Link>
                                    <button className='btn btn-danger mx-2' 
                                        onClick={()=>deleteProducer(producer.id)}
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
