import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'

function Profile() {
  const [open,setOpen]=useState(false)
  return (
    <div>
      <div className="card  p-5 mt-3 me-2" style={{backgroundColor:'transparent',border:"1px solid"}}>
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button onClick={()=>setOpen(!open)} className='btn '>
          <i className='fa-solid fa-angle-down '></i>
          </button>
        </div>
        <Collapse in={open}>
        <div>
        <div className=' justify-content-center'>
          <label >
            <input type="file" style={{display:'none'}} />
            <img src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg" width={"200px"} alt="" />
          </label>
          <div className="mt-5">
            <input type="text" placeholder='Github Link' className='form-control' />
            <br />
            <input type="text" placeholder='Linkedin Link' className='form-control' />
          </div>
          <div className="d-grid mt-3">
            <button className='btn btn-success'>
            Update
            </button>
          </div>
        </div>
        </div>
        </Collapse>
      </div>

    </div>
  )
}

export default Profile