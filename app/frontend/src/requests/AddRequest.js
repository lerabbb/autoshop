import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'

export default function AddRequest() {

    let navigate=useNavigate();
    
    const [consumers, setConsumers] = useState([])
    const [consumerOptions, setConsumerOptions] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    useEffect(()=>{
        loadOptions();
    }, [consumers]);

    const loadData = async()=>{
        const [consumerResult] = await Promise.all([
            axios.get('http://localhost:8080/consumers'),
        ]);
        setConsumers(consumerResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = consumers.map((c) => ({ 
            value: c.id, 
            label: c.firstname+" "+c.lastname+" "+c.patronymic
        }));
        setConsumerOptions(newOptions);
    }

    const {
        handleSubmit, register,
        control, 
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur"
    });

    const { field: consumerField } = useController({
        name: 'consumer.id', 
        control,
        rules: {required: true},
    })
    
    const onSelectConsumer=(option)=>{
        consumerField.onChange(option.value);
    }

    const onSubmit= async (data) => {
        alert(JSON.stringify(data));
        await axios.post("http://localhost:8080/requests", data);
        navigate("/requests")
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новая заявка</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='mb-4'>
                        <label className="form-label">Покупатель</label>
                        <Select
                            value = {consumerOptions.find(({value})=> value === consumerField.value )}
                            onChange={(e) => onSelectConsumer(e)}
                            options={consumerOptions}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Дата оформления</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Дата отправления'
                            {...register("registerDate", {
                                required: "Поле обязательно к заполнению"
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.registerDate && <p>{errors?.registerDate?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2'
                        type="submit"
                        disabled={!isValid}
                    >Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/requests"}>Отмена</Link>
                </form>
            </div>          
        </div>    
    </div>
  )
}
