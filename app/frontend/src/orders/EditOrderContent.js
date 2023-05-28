import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

export default function EditOrderContent() {

    let navigate=useNavigate();
    
    const params = new URLSearchParams(useLocation().search);
    const o_id = params.get('o');
    const d_id = params.get('d');

    const [entity, setEntity] = useState({
        order: {
            id: o_id
        },
        detail: {
            id: d_id,
            name: "",
        },
        count: 0,
        price: 0,
        dateSent: null,
        dateRcvd: null
    })
    const [orders, setOrders] = useState([])
    const [details, setDetails] = useState([])

    const [orderOptions, setOrderOptions] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);
    
    useEffect(()=>{
        loadOptions();
    }, [details, orders]);

    useEffect(()=>{
        setValue("order.id", entity.order.id);
        setValue("detail.id", entity.detail.id);
        setValue("count", entity.count || 0);
        setValue("price", entity.price || 0);
        setValue("dateSent", entity.dateSent );
        setValue("dateRcvd", entity.dateRcvd );
    }, [entity]);

    const loadData = async()=>{
        const [detailResult, ordersResult, entityResult] = await Promise.all([
            axios.get('http://localhost:8080/details'),
            axios.get('http://localhost:8080/orders'),
            axios.get('http://localhost:8080/order_content/o='+o_id+'/d='+d_id),
        ]);
        setDetails(detailResult.data);
        setOrders(ordersResult.data);
        setEntity(entityResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = details.map((c) => ({ value: c.id, label: c.name }));
        setDetailOptions(newOptions);

        const newOrderOptions = orders.map((o) => ({ value: o.id, label: o.id }));
        setOrderOptions(newOrderOptions);
        setValue("order.id", o_id);
        setValue("detail.id", d_id);
    }

    const {
        register, handleSubmit, setValue,
        control, reset,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
        defaultValues: entity
    });

    const { field: orderField } = useController({
        name: 'order.id', 
        control,
        rules: {required: true},
    })
    const { field: detailField } = useController({
        name: 'detail.id', 
        control,
        rules: {required: true},
    })

    const onSelectOrder=(option)=>{
        orderField.onChange(option.value)
    }
    const onSelectDetail=(option)=>{
        detailField.onChange(option.value)
    }

    const onSubmit= async (data) => {
        //alert(JSON.stringify(data));
        await axios.put("http://localhost:8080/order_content/o="+orderField.value+"/d="+detailField.value, data);
        reset();
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Изменить данные о товаре в поставке</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className="form-label">Поставка</label>
                        <Select
                            value = {orderOptions.find(({value})=> value === orderField.value )}
                            onChange={(e) => onSelectOrder(e)}
                            options={orderOptions}
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
                            type="number" className="form-control" min="0" max="1000000" step={0.01}
                            placeholder='Цена'
                            {...register("price", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.price && <p>{errors?.price?.message || "Error!"}</p>}
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="form-label">Дата отправления</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Дата отправления'
                            {...register("dateSent")}
                        />
                        <div className="text-danger form-text">
                            {errors?.dateSent && <p>{errors?.dateSent?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Дата прибытия</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Дата прибытия'
                            {...register("dateRcvd")}
                        />
                        <div className="text-danger form-text">
                            {errors?.dateRcvd && <p>{errors?.dateRcvd?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/vieworder/"+o_id}>Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
  )
}
