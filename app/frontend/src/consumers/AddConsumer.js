import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function AddConsumer() {

    let navigate=useNavigate();

    const [consumer, setConsumer] = useState({
        firstname:"",
        lastname:"",
        patronymic:"",
        phoneNum:""
    });

    const {
        register, handleSubmit,
        formState: {errors, isValid},
    } = useForm({ mode: "onBlur" });

    const onChange=(e) =>{
        setConsumer({...consumer,[e.target.name]:e.target.value});
    }

    const onSubmit= async (data) => {
        //console.log(consumer);
        //alert(JSON.stringify(consumer));
        await axios.post("http://localhost:8080/consumers", consumer);
        navigate("/consumers");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый покупатель</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder='Имя'
                        name = "firtname" 
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
                        name = "lastname"
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
                        name="patronymic"
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
                        name="phoneNum"
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
