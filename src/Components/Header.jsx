import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <Navbar className="  w-100" style={{borderBottom:"1px solid white"}}>
<div className='container-fluid'>
          <Navbar.Brand >
            <Link to={'/'} style={{textDecoration:"none",color:"white"}}>
            <i className='fa-solid fa-list-check me-2'></i>
          Project Fair  </Link>
          </Navbar.Brand>
          </div>
      </Navbar>
    </div>
  )
}

export default Header