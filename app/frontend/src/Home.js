import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
    <section className='py-5 text-center container'>
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Магазин автозапчастей</h1>
        <p class="lead text-body-secondary">Добро пожаловать на сайт. Хорошей работы!</p>
      </div>
    </div>
    </section>
    
    <div className='album py-5 bg-body-teritary'>
          <div className="container">

<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-10">
  <div className="col">
    <div className="card shadow-sm">
      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#c70000"></rect>
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Покупатели</text>
        </svg>
      <div className="card-body">
        <p className="card-text">Информация о покупателях.</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link type="Link" className="btn btn-sm btn-outline-secondary" to={'/consumers'}>Перейти</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card shadow-sm">
      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#a35400"></rect>
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Заявки</text>
        </svg>
      <div className="card-body">
        <p className="card-text">Информация о заявках, которые оставили покупатели.</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link type="Link" className="btn btn-sm btn-outline-secondary" to={'/requests'}>Перейти</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card shadow-sm">
      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#dc9d00"></rect>
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Поставки</text>
        </svg>
      <div className="card-body">
        <p className="card-text">Информация о поставках товаров.</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link type="Link" className="btn btn-sm btn-outline-secondary" to={'/orders'}>Перейти</Link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="col">
    <div className="card shadow-sm">
      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#2aa11d"></rect>
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Склад</text>
        </svg>
      <div className="card-body">
        <p className="card-text">Информация о товарах, хранящихся на складе.</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link type="Link" className="btn btn-sm btn-outline-secondary" to={'/stock'}>Перейти</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card shadow-sm">
      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#1560bd"></rect>
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Продажи</text>
        </svg>
      <div className="card-body">
        <p className="card-text">Информация о продажах.</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link type="Link" className="btn btn-sm btn-outline-secondary" to={'/sales'}>Перейти</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card shadow-sm">
      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#072469"></rect>
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Дефекты</text>
        </svg>
      <div className="card-body">
        <p className="card-text">Информация о товарах, которые имели брак</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link type="Link" className="btn btn-sm btn-outline-secondary" to={'/defects'}>Перейти</Link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="col">
    <div className="card shadow-sm">
      <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#440066"></rect>
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Товары</text>
        </svg>
      <div className="card-body">
        <p className="card-text">Номенклатура товаров.</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link type="Link" className="btn btn-sm btn-outline-secondary" to={'/details'}>Перейти</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

    </div>
    </div>
  )
}
