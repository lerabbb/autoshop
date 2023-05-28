import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditConsumer() {

    let navigate=useNavigate();
    
    const {id}=useParams()

    const [consumer, setConsumer] = useState({
        firstname:"",
        lastname:"",
        patronymic:"",
        phoneNum:""
    });

    const{firstname,lastname,patronymic,phoneNum}=consumer

    const {
        register, handleSubmit,
        formState: {errors, isValid},
    } = useForm({ mode: "onBlur" });

    useEffect(()=>{
        loadConsumer()
    }, []);

    const onChange=(e) =>{
        setConsumer({...consumer,[e.target.name]:e.target.value});
    }

    const onSubmit= async (data)=>{
        await axios.put('http://localhost:8080/consumers/'+id, consumer);
        navigate("/consumers");
    };

    const loadConsumer=async ()=>{
        const result = await axios.get('http://localhost:8080/consumers/'+id)
        setConsumer(result.data)
    }

  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Изменить данные покупателя №{id}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder='Имя' 
                    defaultValue={firstname}
                    {...register("firstname", {
                        onBlur: (e) => {onChange(e)},
                        required: "Поле обязательно к заполнению",
                    })}
                />
                <div className="text-danger" style={{height:40}}>
                    {errors?.firstname && <p>{errors?.firstname?.message || "Error!"}</p>}
                </div>

                <input 
                    type="text" 
                    className="form-control" 
                    placeholder='Фамилия' 
                    defaultValue={lastname}
                    {...register("lastname", {
                        onBlur: (e) => {onChange(e)},
                        required: "Поле обязательно к заполнению",
                    })}
                />
                <div className="text-danger" style={{height:40}}>
                    {errors?.lastname && <p>{errors?.lastname?.message || "Error!"}</p>}
                </div>

                <input 
                    type="text" 
                    className="form-control"
                    placeholder='Отчество' 
                    defaultValue={patronymic}
                    {...register("patronymic", {
                        onBlur: (e) => {onChange(e)},
                        required: "Поле обязательно к заполнению",
                    })}
                />
                <div className="text-danger" style={{height:40}}>
                    {errors?.patronymic && <p>{errors?.patronymic?.message || "Error!"}</p>}
                </div>

                <input 
                    type="tel" 
                    className="form-control" 
                    placeholder='Номер телефона' 
                    value={phoneNum}
                    {...register("phoneNum", {
                        onBlur: (e) => {onChange(e)},
                        required: "Поле обязательно к заполнению",
                        pattern:{
                            value:/^\+?\d{11}$|^\d{6}$/,
                            message: "Неккоректный номер телефона"
                        }             
                    })}
                />
                <div className="text-danger" style={{height:40}}>
                    {errors?.phoneNum && <p>{errors?.phoneNum?.message || "Error!"}</p>}
                </div>
                <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                <Link className='btn btn-outline-danger mx-2' to="/consumers">Отмена</Link>
            </form>
        </div>
    </div>    
</div>
  )
}
