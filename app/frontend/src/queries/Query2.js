import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'

export default function Query2() {

    let navigate=useNavigate();
    
    const [details, setDetails] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);

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

    const { 
        register,
        formState: {errors},
        handleSubmit, control
    } = useForm({ 
        mode: "onBlur",
        defaultValues: {
            count: 0,
            start: null,
            end: null
        }
    });

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
        const{count, start, end} = data;
        // alert(count)
        const [vendorResult] = await Promise.all([
            axios.get("http://localhost:8080/vendors/detail="+detailField.value+"/count="+count+"/start="+start+"/end="+end),
        ]);
        setVendors(vendorResult.data);
        console.log(vendors);
        setQueryDone(!queryDone);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h4 className='text-center m-4'>Получить перечень и общее число поставщиков, поставивших указанный товар в объеме, не менее заданного за определенный период.</h4>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                  
                    <div className='mb-4'>
                        <label className="form-label">Товар</label>
                        <Select
                            value = {detailOptions.find(({value})=> value === detailField.value )}
                            onChange={(e) => onSelectDetail(e)}
                            options={detailOptions}
                        />
                    </div>
                    
                    <div className='mb-4'>
                        <label className="form-label">Количество</label>
                        <input 
                            type="number" className="form-control" min="1" max="1000" step={1} placeholder='Количество'
                            {...register("count", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.count && <p>{errors?.count?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Начало периода</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Начало периода'
                            {...register("start", {
                                required: "Поле обязательно к заполнению"
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.date && <p>{errors?.date?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Конец периода</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Конец периода'
                            {...register("end", {
                                required: "Поле обязательно к заполнению"
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.date && <p>{errors?.date?.message || "Error!"}</p>}
                        </div>
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
