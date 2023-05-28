import React from 'react'

export default function MyForm() {

    (() => {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
      
            form.classList.add('was-validated')
          }, false)
        })
      })()

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Новый покупатель</h2>
                <form className="row g-3 needs-validation" novalidate>
                <div className="col-md-4">
                    <label for="validationCustom01" className="form-label">First name</label>
                    <input type="text" className="form-control" id="validationCustom01" value="Mark" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label for="validationCustom02" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="validationCustom02" value="Otto" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-6">
                    <label for="validationCustom03" className="form-label">City</label>
                    <input type="text" className="form-control" id="validationCustom03" required/>
                    <div className="invalid-feedback">
                        Укажите город
                    </div>
                </div>              
                <div className="col-md-3">
                    <label for="validationCustom05" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="validationCustom05" required/>
                    <div className="invalid-feedback">
                        Please provide a valid zip.
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                        <label className="form-check-label" for="invalidCheck">
                            Agree to terms and conditions
                        </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
                </form>
            </div>
        </div>    
    </div>
  )
}
