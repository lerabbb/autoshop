import React, { useState } from 'react'

export default function Navbar(props) {
    const [open, setOpen] = useState(false);

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Главная</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/consumers">Покупатели</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/details">Товары</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/stock">Склад</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/requests">Заявки</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/orders">Поставки</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/vendors">Поставщики</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/sales">Продажи</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/producers">Производители</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  );
}
