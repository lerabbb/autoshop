import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Query16() {
    
    const [details, setDetails] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = async()=>{
        const [detailResult] = await Promise.all([
            axios.get('http://localhost:8080/details/velocity-of-money'),
        ]);
        setDetails(detailResult.data);
    }

  return (
    <div className='container'>
        <DetailsResult/>
    </div>
  )

   
 function DetailsResult() {
    return (
      <div className='container'>
      <div className='py-4'>
        <h4 className='text-center m-4'>Cкорость оборота денежных средств, вложенных в товар (как товар быстро продается)</h4>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Товар</th>
                <th scope="col">Скорость  оборота, дн.</th>
            </tr>
        </thead>
        <tbody>{
                details.map((item, index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{item.detail.id}</td>
                        <td>{item.velocityOfMoney}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
}}