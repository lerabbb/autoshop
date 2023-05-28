import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

export default function EditSaleContent() {

    let navigate=useNavigate();
    
    const params = new URLSearchParams(useLocation().search);
    const s_id = params.get('sale');
    const sd_id = params.get('sd');
    const [entity, setEntity] = useState({
        sale:{
            id: s_id
        },
        stockDetail: {
            id: sd_id
        },
        count: 0,
        price: 0,
    })

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

    useEffect(()=>{
        setValue("sale.id", entity.sale.id);
        setValue("stockDetail.id", entity.stockDetail.id);
        setValue("count", entity.count || 0);
        setValue("price", entity.price || 0);
    }, [entity]);

    const loadData = async()=>{
        const [saleResult, stockResult, entityResult] = await Promise.all([
            axios.get('http://localhost:8080/sales'),
            axios.get('http://localhost:8080/stock'),
            axios.get('http://localhost:8080/sale_content/sale='+s_id+'/sd='+sd_id),
        ]);
        setStocks(stockResult.data);
        setSales(saleResult.data);
        setEntity(entityResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = sales.map((o) => ({ value: o.id, label: o.id}));
        setSaleOptions(newOptions);

        const newRequestOptions = stocks.map((o) => ({ value: o.id, label: o.id+"; "+o.detail.name+"; "+o.order.id+"; "+ o.count}));
        setStockOptions(newRequestOptions);
    }

    const {
        register, handleSubmit, setValue,
        control, reset,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
        defaultValues: entity
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
        await axios.put("http://localhost:8080/sale_content/sale"+s_id+"/sd="+sd_id, data);
        reset();
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Изменить данные о товаре в продаже</h2>
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
                        <label className="form-label">Цена</label>
                        <input 
                            type="number" className="form-control" min="0" max="100" step={0.01}
                            placeholder='Скидка'
                            {...register("price", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.price && <p>{errors?.price?.message || "Error!"}</p>}
                        </div>
                    </div>
                    
                   

                    <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/viewsale/"+s_id}>Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
)
}

