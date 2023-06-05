import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Select from 'react-select'

export default function Query1() {

    const [details, setDetails] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);
    const typeOptions = [
        { value: 1, label: 'Дилер' },
        { value: 2, label: 'Фирма' },
        { value: 3, label: 'Магазин' },
        { value: 4, label: 'Небольшое производство' },
    ];

    const [vendors, setVendors] = useState([]);
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
    const { field: typeField} = useController({
        name: 'type.id',
        control,
        rules: {required: true},
        defaultValue: 1,    
    })
    
    const onSelectDetail=(option)=>{
        detailField.onChange(option.value);
        setQueryDone(false);
    }
    
    const onSelectType=(option)=>{
        typeField.onChange(option.value);
        setQueryDone(false);
    }

    const onSubmit= async (data) => {
        const [vendorResult] = await Promise.all([
            axios.get('http://localhost:8080/vendors/type='+typeField.value+'/detail='+detailField.value),
        ]);
        setVendors(vendorResult.data);
        setQueryDone(!queryDone);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h4 className='text-center m-4'>Получить перечень и общее число поставщиков определенной категории, поставляющих указанный вид товара</h4>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='mb-4'>
                        <label className="form-label">Категория поставщика</label>
                        <Select
                            value = {typeOptions.find(({value})=> value === typeField.value )}
                            onChange={(e) => onSelectType(e)}
                            options={typeOptions}
                        />
                    </div>

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
        <h6 className='text-center m-4'>Общее количество: {vendors.length}</h6>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Название</th>
                <th scope="col">Категория</th>
                <th scope="col">Адрес</th>
                <th scope="col">Контакты</th>
            </tr>
        </thead>
        <tbody>{
                vendors.map((vendor, index)=>(
                    <tr>
                        <th scope="row" key={vendor.id}>{vendor.id}</th>
                        <td>{vendor.name}</td>
                        <td>{vendor.type.name}</td>
                        <td>{vendor.address}</td>
                        <td>{vendor.phoneNum}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}
