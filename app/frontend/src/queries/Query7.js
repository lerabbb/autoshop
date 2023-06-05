import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Query7() {
    
    const [details, setDetails] = useState([]);
    const [vendors, setVendors] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = async()=>{
        const [detailResult, vendorResult] = await Promise.all([
            axios.get('http://localhost:8080/details/best-sells'),
            axios.get('http://localhost:8080/vendors/cheapest'),
        ]);
        setDetails(detailResult.data);
        setVendors(vendorResult.data);
    }

  return (
    <div className='container'>
        <DetailsResult/>
        <VendorsResult/>
    </div>
  )

   
 function DetailsResult() {
    return (
      <div className='container'>
      <div className='py-4'>
        <h4 className='text-center m-4'>10 продаваемых деталей</h4>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Название</th>
                <th scope="col">Количество проданных штук</th>
            </tr>
        </thead>
        <tbody>{
                details.map((item, index)=>(
                    <tr>
                        <th scope="row" key={item.id}>{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.sum}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }

 function VendorsResult() {
    return (
      <div className='container'>
      <div className='py-4'>
        <h4 className='text-center m-4'>10 дешевых поставщиков</h4>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Название</th>
                <th scope="col">Средняя стоимость товаров</th>
            </tr>
        </thead>
        <tbody>{
                vendors.map((item, index)=>(
                    <tr>
                        <th scope="row" key={item.id}>{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.averagePrice}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
}
}