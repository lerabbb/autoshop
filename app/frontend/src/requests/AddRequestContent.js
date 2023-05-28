import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

export default function AddRequestContent() {

    let navigate=useNavigate();
    
    const {id}=useParams();
    const [requests, setRequests] = useState([])
    const [details, setDetails] = useState([])

    const [requestOptions, setRequestOptions] = useState([]);
    const [detailOptions, setDetailOptions] = useState([]);
    const stateOptions = [
        { value: 1, label: 'Заказ оформлен' },
        { value: 2, label: 'Заказ в пути' },
        { value: 3, label: 'Заказ прибыл' },
        { value: 4, label: 'Заказ готов к получению' },
    ];

    useEffect(()=>{
        loadData();
    }, []);
    
    useEffect(()=>{
        loadOptions();
    }, [details, requests]);

    const loadData = async()=>{
        const [detailResult, requestResult] = await Promise.all([
            axios.get('http://localhost:8080/details'),
            axios.get('http://localhost:8080/requests'),
        ]);
        setDetails(detailResult.data);
        setRequests(requestResult.data);
    }

    const loadOptions = ()=>{
        const newOptions = details.map((c) => ({ value: c.id, label: c.name }));
        setDetailOptions(newOptions);

        const newRequestOptions = requests.map((o) => ({ value: o.id, label: o.id }));
        setRequestOptions(newRequestOptions);
        setValue("request.id", id);
    }

    const {
        register, handleSubmit, setValue,
        control, reset,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
        defaultValues:{
            request: {
                id: id
            },
            detail: {
                id: "",
                name: "",
            },
            state: {
                id: 1
            },
            count: 0,
            notifyDate: null
        }
    });

    const { field: requestField } = useController({
        name: 'request.id', 
        control,
        rules: {required: true},
    })
    const { field: detailField } = useController({
        name: 'detail.id', 
        control,
        rules: {required: true},
    })
    const { field: stateField } = useController({
        name: 'state.id', 
        control,
        rules: {required: true},
        defaultValue: 1,
    })

    const onSelectRequest=(option)=>{
        requestField.onChange(option.value)
    }
    const onSelectDetail=(option)=>{
        detailField.onChange(option.value)
    }
    const onSelectState=(option)=>{
        stateField.onChange(option.value)
    }

    const onSubmit= async (data) => {
        alert(JSON.stringify(data));
        await axios.post("http://localhost:8080/request_content", data);
        reset();
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый товар в заявке</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className="form-label">Заявка</label>
                        <Select
                            value = {requestOptions.find(({value})=> value === requestField.value )}
                            onChange={(e) => onSelectRequest(e)}
                            options={requestOptions}
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
                        <label className="form-label">Статус</label>
                        <Select
                            value = {stateOptions.find(({value})=> value === stateField.value )}
                            onChange={(e) => onSelectState(e)}
                            options={stateOptions}
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
                        <label className="form-label">Дата уведомления</label>
                        <input 
                            type="date" className="form-control"
                            {...register("notifyDate")}
                        />
                        <div className="text-danger form-text">
                            {errors?.notifyDate && <p>{errors?.notifyDate?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/viewrequest/"+id}>Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
)
}

