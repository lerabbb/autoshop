import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewSale() {

    const [entity,setEntity]=useState({
        consumer: {
            id: "",
            firstname: "",
            lastname: "",
            patronymic: "",
        },
        date: ""
    })
    const [saleContent, setSaleContent]=useState([]);

    const {id}=useParams();

    useEffect(()=>{
        loadEntity()
    }, []);

    const loadEntity= async()=>{
        const [saleResult, saleContentResult] = await Promise.all([
            axios.get('http://localhost:8080/sales/'+id),
            axios.get('http://localhost:8080/sale_content/sale='+id)
        ]);
        setEntity(saleResult.data);
        setSaleContent(saleContentResult.data);
    }

    //ПЕРЕДЕЛАТЬ СРОЧНО!!!!!!!!!!
    const deleteSaleContent=async (book_id)=>{
        await axios.delete('http://localhost:8080/sale_content/'+book_id)
        loadEntity()
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Информация о продаже №{id}</h2>

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
                                    <b>Дата продажи: </b> {entity.date || "-"}
                                </list>
                                                                
                            </ul>
                        </div>
                    </div>


                <Link className='btn btn-primary my-2' to={'/sales'}>Назад</Link>
                </div>
            </div>
                    <OrderContent/>
                    <Link className='btn btn-primary mb-4' to={"/addsalecontent/"+id}>Добавить товары в заявку</Link>
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
              <th scope="col">Номер товара на складе</th>
              <th scope="col">Товар</th>
              <th scope="col">Поставка</th>
              <th scope="col">Количество</th>
              <th scope="col">Цена</th>
              <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {
              saleContent.map((s, index)=>(
                  <tr>
                      <th scope="row" key={index}>{index+1}</th>
                      <td>{s.stockDetail.id}</td>
                      <td>
                        <Link className='label' to={'/viewdetail/'+s.stockDetail.detail.id}>
                            {s.stockDetail.detail.name}
                        </Link>
                      </td>
                      <td>{s.stockDetail.order.id}</td>
                      <td>{s.count}</td>
                      <td>{s.price}</td>
                      <td>
                          <Link className='btn btn-outline-primary mx-2'to={'/editsalecontent?sale='+s.id+"&sd="+s.stockDetail.id}>Изменить</Link>
                          <button className='btn btn-danger mx-2' onClick={()=>deleteSaleContent(s.id)}>Удалить</button>
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
