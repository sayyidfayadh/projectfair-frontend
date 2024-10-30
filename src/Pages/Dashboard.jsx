import React, { useState } from 'react'
import Header from '../Components/Header'
import { Col,Row } from 'react-bootstrap'

import Myprojects from'../Components/Myprojects'
import Profile from '../Components/Profile'
function Dashboard() {
  // const[username,setUserName]=useState("")
  return (
    <div  >
      <Header insideDashboard/>
      <Row>
        {/* My projects */}
        <Col sm={12} md={8}>
        <h2>Welcome <span className='texxt-warning fw-bolder'>{sessionStorage.getItem("username") || "user"}</span></h2>
        <Myprojects/>
        </Col>
        {/* profile */}
        <Col sm={12} md={4}>
      <Profile/>
        </Col>
      </Row>
      
    </div>
  )
}

export default Dashboard