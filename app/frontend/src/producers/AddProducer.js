import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function AddProducer() {

    let navigate=useNavigate();

    const [producer, setProducer] = useState({
        name:"",
        address:"",
        phoneNum:""
    });

    const {
        register, handleSubmit,
        formState: {errors, isValid},
    } = useForm({ mode: "onBlur" });

    const onChange=(e) =>{
        setProducer({...producer,[e.target.name]:e.target.value});
    }

    const onSubmit= async (data)=>{
        alert(JSON.stringify(producer));
        await axios.post("http://localhost:8080/producers", producer);
        navigate("/producers");
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый производитель</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text"
                        className="form-control" 
                        placeholder='Название' 
                        {...register("name", {
                            onBlur: (e) => {onChange(e)},
                            required: "Поле обязательно к заполнению",
                        })}
                    />
                    <div className="text-danger" style={{height:40}}>
                        {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                    </div>

                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder='Адрес'
                        {...register("address", {
                            onBlur: (e) => {onChange(e)},
                            required: "Поле обязательно к заполнению",
                        })}
                    />
                    <div className="text-danger" style={{height:40}}>
                        {errors?.address && <p>{errors?.address?.message || "Error!"}</p>}
                    </div>

                    <input 
                        type="tel" 
                        className="form-control" 
                        placeholder='Номер телефона'
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
                    <Link className='btn btn-outline-danger mx-2' to="/producers">Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
  )
}
