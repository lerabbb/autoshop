import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Select from 'react-select'

export default function Query9() {
    
    const [details, setDetails] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);

    const [vendors, setVendors] = useState([]);
    const [profit, setProfit] = useState([]);
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
        const{ start, end } = data;
        const [vendorResult, profitResult] = await Promise.all([
            axios.get("http://localhost:8080/vendors/part/detail="+detailField.value),
            axios.get("http://localhost:8080/sales/profit/start="+start+"/endDate="+end),
        ]);
        setVendors(vendorResult.data);
        setProfit(profitResult.data);
        setQueryDone(!queryDone);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h4 className='text-center m-4'>Получить долю товара конкретного поставщика в процентах, деньгах, единицах от всего оборота магазина, прибыль магазина за указанный период.</h4>
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
        <h6 className='text-center m-4'>Прибыль: {profit}</h6>
        <h6 className='text-center m-4'>Общее количество: {vendors.length}</h6>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Название</th>
                <th scope="col">Доля товара, %</th>
                <th scope="col">Доля товара, руб.</th>
                <th scope="col">Доля товара, шт.</th>
            </tr>
        </thead>
        <tbody>{
                vendors.map((item, index)=>(
                    <tr>
                        <th scope="row" key={item.id}>{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.percents}</td>
                        <td>{item.partAsMoney}</td>
                        <td>{item.partAsNum}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}
