import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Query15() {
    
    const [report, setReport] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = async()=>{
        const [detailResult] = await Promise.all([
            axios.get('http://localhost:8080/stock/stock-report'),
        ]);
        setReport(detailResult.data);
    }

  return (
    <div className='container'>
        <StockReport/>
    </div>
  )

   
 function StockReport() {
    return (
      <div className='container'>
      <div className='py-4'>
        <h4 className='text-center m-4'>Инвентаризационная ведомость</h4>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Товар</th>
                <th scope="col">Поставка</th>
                <th scope="col">Количество</th>
                <th scope="col">Стоимость</th>
            </tr>
        </thead>
        <tbody>{
                report.map((item, index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{item.detail.name}</td>
                        <td>{item.order.id}</td>
                        <td>{item.count}</td>
                        <td>{item.purchasePrice}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}