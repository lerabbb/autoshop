import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Select from 'react-select'

export default function Query18() {
    
    const [details, setDetails] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);

    const [requests, setRequests] = useState([]);
    const [totalSum, setTotalSum] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    useEffect(()=>{
        loadOptions();
    }, [details]);

    const loadData = async()=>{
        const [detailResult] = await Promise.all([
            axios.get('http://localhost:8080/details'),
        ]);
        setDetails(detailResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = details.map((c) => ({ 
            value: c.id, 
            label: c.id+'. '+c.name
        }));
        setDetailOptions(newOptions);
    }

    const { handleSubmit, control} = useForm({ mode: "onBlur" });

    const { field: detailField } = useController({
        name: 'detail.id', 
        control,
        rules: {required: true},
    })
    
    const onSelectDetail=(option)=>{
        detailField.onChange(option.value);
    }
    
    const onSubmit= async (data) => {
        const [requestResult, totatlSumResult] = await Promise.all([
            axios.get('http://localhost:8080/requests/detail='+detailField.value),
            axios.get('http://localhost:8080/requests/sum-price/detail='+detailField.value),
        ]);
        setRequests(requestResult.data);
        setTotalSum(totatlSumResult.data)
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h4 className='text-center m-4'>Получить перечень и общее количество заявок от покупателей на ожидаемый товар, подсчитать на какую сумму даны заявки</h4>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='mb-4'>
                        <label className="form-label">Товар</label>
                        <Select
                            value = {detailOptions.find(({value})=> value === detailField.value )}
                            onChange={(e) => onSelectDetail(e)}
                            options={detailOptions}
                        />
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit">Сделать запрос</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/queries"}>Отмена</Link>
                </form>
            </div>          
        </div>    
        <QueryResult/>
    </div>
  )

   
 function QueryResult() {
    return (
      <div className='container'>
      <div className='py-4'>
        <h4 className='text-center m-4'>Результаты</h4>
        <h6 className='text-center m-4'>Общее количество: {requests.length}</h6>
        <h6 className='text-center m-4'>Общая сумма заявок: {totalSum}</h6>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Покупатель</th>
                <th scope="col">Контакты</th>
                <th scope="col">Дата оформления</th>
                <th scope="col">Количество</th>
            </tr>
        </thead>
        <tbody>{
                requests.map((item, index)=>(
                    <tr>
                        <th scope="row" key={item.id}>{item.id}</th>
                        <td>{item.consumer.lastname} {item.consumer.firstname}</td>
                        <td>{item.consumer.phoneNum}</td>
                        <td>{item.registerDate}</td>
                        <td>{item.count}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}
