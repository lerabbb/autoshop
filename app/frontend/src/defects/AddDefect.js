import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

export default function AddDefect() {

    let navigate=useNavigate();
    
    const {id}=useParams();
    const [sales, setSales] = useState([])
    const [stocks, setStocks] = useState([])
    const [stockOptions, setStockOptions] = useState([]);
    const [saleOptions, setSaleOptions] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);
    
    useEffect(()=>{
        loadOptions();
    }, [sales, stocks]);

    const loadData = async()=>{
        const [saleResult, stockResult] = await Promise.all([
            axios.get('http://localhost:8080/sales'),
            axios.get('http://localhost:8080/stock'),
        ]);
        setStocks(stockResult.data);
        setSales(saleResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = sales.map((o) => ({ value: o.id, label: o.id}));
        setSaleOptions(newOptions);

        const newRequestOptions = stocks.map((o) => ({ value: o.id, label: o.id+"; "+o.detail.name+"; "+o.order.id+"; "+ o.count}));
        setStockOptions(newRequestOptions);
        setValue("stockDetail.id", id);
    }

    const {
        register, handleSubmit, setValue,
        control, reset,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
        defaultValues:{
            sale:{
                id: id
            },
            stockDetail: {
                id: 0
            },
            refundFromVendor: 0,
            refundToConsumer: 0,
            count: 0,
        }
    });

    const { field: stockField } = useController({
        name: 'stockDetail.id', 
        control,
        rules: {required: true},
    })
    const { field: saleField } = useController({
        name: 'sale.id', 
        control,
        rules: {required: true},
    })

    const onSelectStock=(option)=>{
        stockField.onChange(option.value)
    }
    const onSelectSale=(option)=>{
        saleField.onChange(option.value)
    }

    const onSubmit= async (data) => {
        alert(JSON.stringify(data));
        await axios.post("http://localhost:8080/sale_content", data);
        reset();
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый товар в продаже</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                   
                    <div className='mb-4'>
                        <label className="form-label">Продажа</label>
                        <Select
                            value = {saleOptions.find(({value})=> value === stockField.value )}
                            onChange={(e) => onSelectSale(e)}
                            options={saleOptions}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Товар со склада</label>
                        <Select
                            value = {stockOptions.find(({value})=> value === stockField.value )}
                            onChange={(e) => onSelectStock(e)}
                            options={stockOptions}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Компенсация от поставщика</label>
                        <input 
                            type="number" className="form-control" min="0" max="1000000" step={0.01}
                            placeholder='Компенсация'
                            {...register("refundFromVendor", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.refundFromVendor && <p>{errors?.refundFromVendor?.message || "Error!"}</p>}
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="form-label">Компенсация покупателю</label>
                        <input 
                            type="number" className="form-control" min="0" max="1000000" step={0.01}
                            placeholder='Компенсация'
                            {...register("refundToConsumer", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.refundToConsumer && <p>{errors?.refundToConsumer?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Количество</label>
                        <input 
                            type="number" className="form-control" min="1" max="10000" step={1} placeholder='Количество'
                            {...register("count", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.count && <p>{errors?.count?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/defects"+id}>Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
)
}

