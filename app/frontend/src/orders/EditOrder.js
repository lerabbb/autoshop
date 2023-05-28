import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

export default function EditOrder() {

    let navigate=useNavigate();
    
    const {id}=useParams()
    const [vendors, setVendors] = useState([])
    const [vendorOptions, setVendorOptions] = useState([]);
    const doneOptions = [
        { value: 0, label: 'не выполнена' },
        { value: 1, label: 'выполнена' }
    ];

    const [entity, setEntity] = useState({
        vendor: {
            id: "",
            name: "",
        },
        isDone: 0
    })

    useEffect(()=>{
        loadData();
    }, []);

    useEffect(()=>{
        loadOptions();
    }, [vendors]);

    useEffect(()=>{
        setValue("vendor.id", entity.vendor.id);
        setValue("isDone", entity.isDone || 0);
    }, [entity]);

    const loadData = async()=>{
        const [orderResult, vendorResult] = await Promise.all([
            axios.get('http://localhost:8080/orders/'+id),
            axios.get('http://localhost:8080/vendors'),
        ]);
        setEntity(orderResult.data);
        setVendors(vendorResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = vendors.map((c) => ({ value: c.id, label: c.name }));
        setVendorOptions(newOptions);
    }

    const {
        handleSubmit, setValue,
        control, 
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur"
    });

    const { field: vendorField } = useController({
        name: 'vendor.id', 
        control,
        rules: {required: true},
    })
    const { field: doneField } = useController({
        name: 'isDone', 
        control,
        rules: {required: true},
    })
    
    const onSelectVendor=(option)=>{
        vendorField.onChange(option.value);
    }
    const onSelectDone=(option)=>{
        doneField.onChange(option.value);
    }

    const onSubmit= async (data) => {
        alert(JSON.stringify(data));
        await axios.put("http://localhost:8080/orders/"+id, data);
        navigate("/orders");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Изменить данные поставки №{id}</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='mb-4'>
                        <label className="form-label">Поставщик</label>
                        <Select
                            value = {vendorOptions.find(({value})=> value === vendorField.value )}
                            onChange={(e) => onSelectVendor(e)}
                            options={vendorOptions}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Статус</label>
                        <Select
                            value = {doneOptions.find(({value})=> value === doneField.value )}
                            onChange={(e) => onSelectDone(e)}
                            options={doneOptions}
                        />
                    </div>
                    <button className='btn btn-outline-primary mx-2'
                        type="submit"
                        disabled={!isValid}
                    >Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to="/orders">Отмена</Link>
                </form>
            </div>          
        </div>    
    </div>
  )
}
