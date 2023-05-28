import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'

export default function AddOrder() {

    let navigate=useNavigate();
    
    const [vendors, setVendors] = useState([])
    const [vendorOptions, setVendorOptions] = useState([]);
    const doneOptions = [
        { value: 0, label: 'не выполнена' },
        { value: 1, label: 'выполнена' }
    ];

    useEffect(()=>{
        loadData();
    }, []);

    useEffect(()=>{
        loadOptions();
    }, [vendors]);

    const loadData = async()=>{
        const [vendorResult] = await Promise.all([
            axios.get('http://localhost:8080/vendors'),
        ]);
        setVendors(vendorResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = vendors.map((c) => ({ value: c.id, label: c.name }));
        setVendorOptions(newOptions);
    }

    const {
        handleSubmit, 
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
        // setEntity({...entity,[data.name]: data.value});
        await axios.post("http://localhost:8080/orders", data);
        navigate("/orders")
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новая поставка</h2>
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
                    <Link className='btn btn-outline-danger mx-2' to={"/orders"}>Отмена</Link>
                </form>
            </div>          
        </div>    
    </div>
  )
}
