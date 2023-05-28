import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewRequest() {

    const [entity,setEntity]=useState({
        consumer: {
            id: "",
            firstname: "",
            lastname: "",
            patronymic: "",
        },
        registerDate: ""
    })
    const [requestContent, setRequestContent]=useState([]);

    const {id}=useParams();

    useEffect(()=>{
        loadEntity()
    }, []);

    const loadEntity= async()=>{
        const [requestResult, requestContentResult] = await Promise.all([
            axios.get('http://localhost:8080/requests/'+id),
            axios.get('http://localhost:8080/request_content/r='+id)
        ]);
        setEntity(requestResult.data);
        setRequestContent(requestContentResult.data);
    }

    const deleteOrderContent=async (book_id)=>{
        await axios.delete('http://localhost:8080/request_content/'+book_id)
        loadEntity()
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о заявке №{id}</h2>

                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list group-flush'>
                                <Link 
                                    className='list-group-item list-group-item-action' 
                                    to={"/viewconsumer/"+entity.consumer.id}
                                >
                                    <b>Покупатель: </b> {entity.consumer.firstname} {entity.consumer.lastname} {entity.consumer.patronymic}
                                </Link>
                                
                                <list className='list-group-item'>
                                    <b>Дата оформления: </b> {entity.registerDate || "-"}
                                </list>
                                                                
                            </ul>
                        </div>
                    </div>


                <Link className='btn btn-primary my-2' to={'/requests'}>Назад</Link>
                </div>
            </div>
                    <OrderContent/>
                    <Link className='btn btn-primary mb-4' to={"/addrequestcontent/"+id}>Добавить товары в заявку</Link>
        </div>
    </div>
  )

  
 function OrderContent() {
    return (
      <div className='container'>
      <div className='py-4'>
      <table className="table border shadow">
      <thead>
          <tr>
              <th scope="col">№</th>
              <th scope="col">Бронирование</th>
              <th scope="col">Товар</th>
              <th scope="col">Статус</th>
              <th scope="col">Количество</th>
              <th scope="col">Дата уведомления</th>
              <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {
              requestContent.map((s, index)=>(
                  <tr>
                      <th scope="row" key={index}>{index+1}</th>
                      <td>{s.id}</td>
                      <td>
                        <Link className='label' to={'/viewdetail/'+s.detail.id}>
                            {s.detail.name}
                        </Link>
                      </td>
                      <td>{s.state.name}</td>
                      <td>{s.count}</td>
                      <td>{s.notifyDate || "-"}</td>
                      <td>
                          <Link className='btn btn-outline-primary mx-2'to={'/editrequestcontent/'+s.id}>Изменить</Link>
                          <button className='btn btn-danger mx-2' onClick={()=>deleteOrderContent(s.id)}>Удалить</button>
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
  
}
