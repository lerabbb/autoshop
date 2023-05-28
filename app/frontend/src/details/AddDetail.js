import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'

export default function AddDetail() {

    let navigate=useNavigate();
    
    const [producers, setProducers] = useState([])
    const [options, setOptions] = useState([]);
    const [detail, setDetail] = useState({
        name:"",
        producer:{
            id: 0,
            name: "",
        },
        guarantee:0,
        size:0,
    });

    useEffect(()=>{
        loadProducers()
    }, []);

    useEffect(()=>{
        const newOptions = producers.map((p) => ({
            value: p.id,
            label: p.name
        }));
        setOptions(newOptions);
    }, [producers]);

    const loadProducers= async()=>{
        const result = await axios.get('http://localhost:8080/producers')
        setProducers(result.data);
    }

    const {
        register, handleSubmit,setValue, 
        control, 
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
        defaultValues: detail
    });

    const { field } = useController({
        name: 'producer.id', 
        control,
        rules: {required: true},
        defaultValue: 1,
    })

    const onSelectProducer=(option)=>{
        field.onChange(option.value)
    }
    const onSubmit= async (data) => {
        // setDetail({...detail,[data.name]: data.value});
        // alert(JSON.stringify(detail));
        await axios.post("http://localhost:8080/details", data);
        navigate("/details");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый товар</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className="form-label" for="nameInput">Название</label>
                        <input 
                            type="text" className="form-control" id="nameInput" 
                            placeholder='Название' name = "name" 
                            {...register("name", {
                                required: "Поле обязательно к заполнению",
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Поставщик</label>
                        <Select
                            value = {options.find(({value})=> value === field.value )}
                            onChange={(e) => onSelectProducer(e)}
                            options={options}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Гарантия (мес.)</label>
                        <input 
                            type="number" className="form-control" min="0" max="100" step={1}
                            placeholder='Гарантия' name="guarantee"
                            {...register("guarantee", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.guarantee && <p>{errors?.guarantee?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Размер</label>
                        <input 
                            type="number" className="form-control" min="0" max="100" step={1}
                            placeholder='Размер' name="size"
                            {...register("size", {
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.deliveryTime && <p>{errors?.deliveryTime?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to="/details">Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
  )
}
