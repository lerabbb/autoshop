import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Query13() {
    
    const [queryResult, setQueryResult] = useState([]);
    const [queryDone, setQueryDone] = useState(false);

    const { 
        register,
        formState: {errors},
        handleSubmit
    } = useForm({ 
        mode: "onBlur",
        defaultValues: {
            day: null,
        }
    });

    const onSubmit= async (data) => {
        const{ day } = data;
        // alert(count)
        const [result] = await Promise.all([
            axios.get("http://localhost:8080/details/sold/day="+day),
        ]);
        setQueryResult(result.data);
        setQueryDone(!queryDone);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h4 className='text-center m-4'> Получить перечень, общее количество и стоимость товара, реализованного за конкретный день.</h4>
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                  
                    <div className='mb-4'>
                        <label className="form-label">Дата</label>
                        <input 
                            type="date" className="form-control"
                            placeholder='Дата'
                            {...register("day", {
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
                <th scope="col">Название</th>
                <th scope="col">Цена</th>
                <th scope="col">Количество</th>
            </tr>
        </thead>
        <tbody>{
                queryResult.map((item, index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.count}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    </div>
  </div>
    )
  }
}
