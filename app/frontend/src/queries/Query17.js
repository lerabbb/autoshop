import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Query17() {
    
    const [emptyCells, setEmptyCells] = useState([]);
    const [capacity, setCapacity] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = async()=>{
        const [emptyCellsResult,capacityResult] = await Promise.all([
            axios.get('http://localhost:8080/stock/empty-cells'),
            axios.get('http://localhost:8080/stock/capacity'),
        ]);
        setEmptyCells(emptyCellsResult.data);
        setCapacity(capacityResult.data);
    }

  return (
    <div className='container'>
        <h4>Пустых ячеек: {emptyCells}</h4>
        <h4>Вместимость: {capacity}</h4>
    </div>
  )
}