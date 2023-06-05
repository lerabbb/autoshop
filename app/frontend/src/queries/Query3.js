import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'

export default function Query3() {

    let navigate=useNavigate();
    
    const [details, setDetails] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);

    const [queryResult, setQueryResult] = useState([]);
    const [queryDone, setQueryDone] = useState(false);

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
        setQueryDone(false);
    }

    const onSubmit= async (data) => {
        const [vendorResult] = await Promise.all([
            axios.get('http://localhost:8080/details/info='+detailField.value),
        ]);
        setQueryResult(vendorResult.data);
        setQueryDone(!queryDone);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h4 className='text-center m-4'>Получить перечень и общее число поставщиков определенной категории, поставляющих указанный вид товара</h4>
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
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Название</th>
                <th scope="col">Цена</th>
                <th scope="col">Поставщик</th>
            </tr>
        </thead>
        <tbody>{
                queryResult.map((item, index)=>(
                    <tr>
                        <th scope="row" key={item.id}>{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.vendor.id}. {item.vendor.name}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}
