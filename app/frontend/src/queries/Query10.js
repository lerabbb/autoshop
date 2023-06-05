import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Query10() {
    
    const [details, setDetails] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = async()=>{
        const [detailResult] = await Promise.all([
            axios.get('http://localhost:8080/details/overhead-costs'),
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
        <h4 className='text-center m-4'>Накладные расходы</h4>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Название</th>
                <th scope="col">%</th>
            </tr>
        </thead>
        <tbody>{
                details.map((item, index)=>(
                    <tr>
                        <th scope="row" key={item.id}>{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.percents}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}