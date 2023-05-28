import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewOrder() {

    const [entity,setEntity]=useState({
        vendor: {
            id: "",
            name: "",
        },
        isDone: 0
    })
    const [orderContent, setOrderContent]=useState([]);


    const {id}=useParams();

    useEffect(()=>{
        loadEntity()
    }, []);

    const loadEntity= async()=>{
        const [orderResult, orderContentResult] = await Promise.all([
            axios.get('http://localhost:8080/orders/'+id),
            axios.get('http://localhost:8080/order_content/o='+id)
        ]);
        setEntity(orderResult.data);
        setOrderContent(orderContentResult.data);
    }

    const deleteOrderContent=async (d_id)=>{
        await axios.delete('http://localhost:8080/order_content/o='+id+'/d='+d_id)
        loadEntity()
    }




  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о поставке №{id}</h2>

                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list group-flush'>
                                <Link 
                                    className='list-group-item list-group-item-action' 
                                    to={"/viewvendor/"+entity.vendor.id}
                                >
                                    <b>Поставщик: </b> {entity.vendor.name}
                                </Link>
                                
                                <list className='list-group-item'>
                                    <b>Выполнена: </b> {entity.isDone && "да" || "нет"}
                                </list>
                                                                
                            </ul>
                        </div>
                    </div>


                <Link className='btn btn-primary my-2' to={'/stock'}>Назад</Link>
                </div>
            </div>
                    <OrderContent/>
                    <Link className='btn btn-primary mb-4' to={"/addordercontent/"+id}>Добавить товары в поставку</Link>
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
              <th scope="col">Товар</th>
              <th scope="col">Количество</th>
              <th scope="col">Цена</th>
              <th scope="col">Дата отправления</th>
              <th scope="col">Дата прибытия</th>
              <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {
              orderContent.map((s, index)=>(
                  <tr>
                      <th scope="row" key={index}>{index+1}</th>
                      <td>
                        <Link className='label' to={'/viewdetail/'+s.detail.id}>
                            {s.detail.name}
                        </Link>
                      </td>
                      <td>{s.count}</td>
                      <td>{s.price}</td>
                      <td>{s.dateSent}</td>
                      <td>{s.dateRcvd}</td>
                      <td>
                          <Link className='btn btn-outline-primary mx-2'to={'/editordercontent?o='+s.order.id+'&d='+s.detail.id}>Изменить</Link>
                          <button className='btn btn-danger mx-2' onClick={()=>deleteOrderContent(s.order.id)}>Удалить</button>
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
