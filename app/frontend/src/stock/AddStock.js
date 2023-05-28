import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'

export default function AddStock() {

    let navigate=useNavigate();
    
    const [cells, setCells] = useState([])
    const [orders, setOrders] = useState([])
    const [orderContent, setOrderContent] = useState([])

    const [cellOptions, setCellOptions] = useState([]);
    const [orderOptions, setOrderOptions] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(0);

    useEffect(()=>{
        loadData();
    }, []);

    useEffect(()=>{
        loadOptions();
    }, [cells, orders]);

    useEffect(()=>{
        loadDetails();
    }, [selectedOrder]);
   
    useEffect(()=>{
        loadDetailOptions();
    }, [orderContent]);

    const loadData = async()=>{
        const [cellsResult, ordersResult] = await Promise.all([
            axios.get('http://localhost:8080/cells'),
            axios.get('http://localhost:8080/orders'),
        ]);
        setCells(cellsResult.data);
        setOrders(ordersResult.data);
    }

    const loadDetails = async()=>{
        const result = await axios.get('http://localhost:8080/order_content/o='+selectedOrder);
        setOrderContent(result.data);
    }

    const loadOptions = ()=>{
        const newOptions = cells.map((c) => ({ value: c.id, label: c.id }));
        setCellOptions(newOptions);

        const newOrderOptions = orders.map((o) => ({ value: o.id, label: o.id }));
        setOrderOptions(newOrderOptions);
    }
    const loadDetailOptions = ()=>{
        const newOptions = orderContent.map((d) => ({ value: d.detail.id, label: d.detail.name }));
        setDetailOptions(newOptions);
    }

    const {
        register, handleSubmit, 
        control, 
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
    });

    const { field: cellField } = useController({
        name: 'cell.id', 
        control,
        rules: {required: true},
        defaultValue: 1,
    })

    const { field: orderField } = useController({
        name: 'order.id', 
        control,
        rules: {required: true},
        defaultValue: "",
    })
    const { field: detailField } = useController({
        name: 'detail.id', 
        control,
        rules: {required: true},
        defaultValue: "",
    })

    const onSelectCell=(option)=>{
        cellField.onChange(option.value);
    }
    const onSelectOrder=(option)=>{
        orderField.onChange(option.value)
        setSelectedOrder(option.value);
    }
    const onSelectDetail=(option)=>{
        detailField.onChange(option.value)
    }

    const onSubmit= async (data) => {
        // setEntity({...entity,[data.name]: data.value});
        alert(JSON.stringify(data));
        await axios.post("http://localhost:8080/details", data);
        navigate("/stock");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый товар на складе</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='mb-4'>
                        <label className="form-label">Ячейка</label>
                        <Select
                            value = {cellOptions.find(({value})=> value === cellField.value )}
                            onChange={(e) => onSelectCell(e)}
                            options={cellOptions}
                        />
                    </div>

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
                            type="number" className="form-control" min="0" max="50" step={1}  
                            placeholder='Количество'
                            {...register("count", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.deliveryTime && <p>{errors?.deliveryTime?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to="/stock">Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
  )
}
