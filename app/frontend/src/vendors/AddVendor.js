import axios from 'axios';
import React, { useState } from 'react'
import { useController, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'

export default function AddVendor() {

    let navigate=useNavigate();

    const contractsOptions = [
        { value: 0, label: 'Нет' },
        { value: 1, label: 'Есть' }
    ];
    const typeOptions = [
        { value: 1, label: 'Дилер' },
        { value: 2, label: 'Фирма' },
        { value: 3, label: 'Магазин' },
        { value: 4, label: 'Небольшое производство' },
    ];

    const [vendor, setVendor] = useState({
        name:"",
        address:"",
        phoneNum:"",
        discount:0,
        contracts:0,
        guarantee:0,
        deliveryTime:0,
        type: {
            id: 1
        }
    });
   
    const {
        register, handleSubmit, control,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
        defaultValues: vendor
    });

    const { field: contractField} = useController({
        name: 'contracts', 
        control,
        rules: {required: true},
        defaultValue: 1,
    })
    const { field: typeField} = useController({
        name: 'type.id',
        control,
        rules: {required: true},
        defaultValue: 1,    
    })

    const onChange=(e) =>{
        setVendor({...vendor,[e.target.name]:e.target.value});
    }
    const onSelectContracts=(option)=>{
        contractField.onChange(option.value)
    }
    const onSelectType=(option)=>{
        typeField.onChange(option.value)
    }

    const onSubmit= async (data) => {
        // alert(JSON.stringify(vendor));
        // console.log(vendor);
        await axios.post("http://localhost:8080/vendors", vendor);
        navigate("/vendors");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый поставщик</h2>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className="form-label" for="nameInput">Название</label>
                        <input 
                            type="text" className="form-control" id="nameInput" 
                            placeholder='Название' name = "name" 
                            {...register("name", {
                                onBlur: (e) => {onChange(e)},
                                required: "Поле обязательно к заполнению",
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Категория поставщика</label>
                        <Select
                            value = {typeOptions.find(({value})=> value === typeField.value )}
                            onChange={(e) => {onSelectType(e)}}
                            options={typeOptions}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Адрес</label>
                        <input 
                            type="text" className="form-control" 
                            placeholder='Адрес' name="address"
                            {...register("address", {
                                onBlur: (e) => {onChange(e)},
                                required: "Поле обязательно к заполнению",
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.address && <p>{errors?.address?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Контакты</label>
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
                        <div className="text-danger form-text">
                            {errors?.phoneNum && <p>{errors?.phoneNum?.message || "Error!"}</p>}
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="form-label">Скидка, %</label>
                        <input 
                            type="number" className="form-control" min="0" max="100" step={0.01}
                            placeholder='Скидка' name="dicsount"
                            {...register("discount", {
                                onBlur: (e) => {onChange(e)},
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.discount && <p>{errors?.discount?.message || "Error!"}</p>}
                        </div>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="form-label">Наличие документов</label>
                        <Select
                            value = {contractsOptions.find(({value})=> value === contractField.value )}
                            onChange={(e) => {onSelectContracts(e)}}
                            options={contractsOptions}
                        />
                    </div>
                    
                    <div className='mb-4'>
                        <label className="form-label">Гарантия (мес.)</label>
                        <input 
                            type="number" className="form-control" min="0" max="100" step={1}
                            placeholder='Гарантия' name="guarantee"
                            {...register("guarantee", {
                                onBlur: (e) => {onChange(e)},
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.guarantee && <p>{errors?.guarantee?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Время поставки (дни)</label>
                        <input 
                            type="number" className="form-control" min="0" max="100" step={1}
                            placeholder='Время поставки' name="deliveryTime"
                            {...register("deliveryTime", {
                                onBlur: (e) => {onChange(e)},
                                required: "Поле обязательно к заполнению"          
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.deliveryTime && <p>{errors?.deliveryTime?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit" disabled={!isValid}>Добавить</button>
                    <Link className='btn btn-outline-danger mx-2' to="/vendors">Отмена</Link>
                </form>
            </div>
        </div>    
    </div>
  )
}
