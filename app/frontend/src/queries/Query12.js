import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Query12() {
    
    const [queryResult, setQueryResult] = useState([]);
    const [queryDone, setQueryDone] = useState(false);

    const { 
        register,
        formState: {errors},
        handleSubmit
    } = useForm({ 
        mode: "onBlur",
        defaultValues: {
            start: null,
            end: null
        }
    });

    const onSubmit= async (data) => {
        const{ start, end } = data;
        // alert(count)
        const [result] = await Promise.all([
            axios.get("http://localhost:8080/defects/start="+start+"/end="+end),
        ]);
        setQueryResult(result.data);
        setQueryDone(!queryDone);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h4 className='text-center m-4'>Получить перечень и общее количество бракованного товара, пришедшего за определенный период и список поставщиков, поставивших товар.</h4>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                  
                    <div className='mb-4'>
                        <label className="form-label">Начало периода</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Начало периода'
                            {...register("start", {
                                required: "Поле обязательно к заполнению"
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.date && <p>{errors?.date?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className="form-label">Конец периода</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Конец периода'
                            {...register("end", {
                                required: "Поле обязательно к заполнению"
                            })}
                        />
                        <div className="text-danger form-text">
                            {errors?.date && <p>{errors?.date?.message || "Error!"}</p>}
                        </div>
                    </div>

                    <button className='btn btn-outline-primary mx-2' type="submit">Сделать запрос</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/queries"}>Отмена</Link>
                </form>
            </div>          
        </div>    
        <QueryResult/>
    </div>
  )

   
 function QueryResult() {
    return (
      <div className='container'>
      <div className='py-4'>
        <h4 className='text-center m-4'>Результаты</h4>
      <table className="table border shadow">
      <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Товар</th>
                <th scope="col">Количество</th>
                <th scope="col">Поставщик</th>
            </tr>
        </thead>
        <tbody>{
                queryResult.map((item, index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{item.stockDetail.detail.name}</td>
                        <td>{item.count}</td>
                        <td>{item.stockDetail.order.vendor.id}. {item.stockDetail.order.vendor.name} </td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}
