import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import titleImage from '../assets/images/60357aa30eb694f66d6828d5_blog-hero (9).gif'
import ProjectCard from '../Components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getMarqueeProjectAPI } from '../Services/allAPI'
function Home() {
 const  navigate=useNavigate()
  const[userLoggedIn,setLogin]=useState("false")
  const[projects,setProjects]=useState([])
  const getHomeProjects=async()=>{
   const result= await getMarqueeProjectAPI()
  if(result.status==200){
    setProjects (result.data)
  }
  else{
    setProjects([])
  }
  }
  // console.log(projects);
  
  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  },[])
  const handleProjectsPage=()=>{
    
    if(sessionStorage.getItem("token")){

      navigate('/projects')
    }
    else{
    toast.warn("please login")
    }
  }

  return (
    <>
     <ToastContainer position='top-center' theme="light"/>
    <div style={{width:"100%",height:"75vh", backgroundColor:"#040E31"}} className='container-fluid rounded '>

<Row className='align-items-center p-5'>
  <Col sm={12} md={6}>
  <h1 style={{fontSize:'80px'} }className='fw-bolder '><i className='fa-solid fa-list-check me-2'></i>Project Fair</h1>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione unde fugiat nostrum totam cumque officiis iure rerum assumenda alias delectus possimus neque nihil minus, accusantium omnis suscipit non ex voluptate.
  Distinctio sit officiis voluptates doloremque obcaecati? Nobis nihil ipsa, repellendus expedita accusamus asperiores incidunt enim veritatis dolor ducimus ut ea architecto, perspiciatis sunt, debitis quae molestias officiis reprehenderit cupiditate odio?</p>
 
 {!userLoggedIn?<Link to={'/login'} className='btn btn-danger'>Start To Explore</Link>:<Link to={'/dashboard'} className='btn btn-danger'>Manage your project</Link>}
  </Col>
    
<Col sm={12} md={6}>
<img src={titleImage} className='p-2' width={'910px'} alt="title" />
</Col>
</Row>
    </div>
    <hr style={{color:"white"}} />
    {/* // projects */}
    <div className='all-projects mt-5'style={{backgroundColor:"#040E31"}}>
      <h1 className='text-center '>
        Explore Your Project
      </h1>
      <marquee scrollamount={25}>

<Row>
  {projects.length > 0 ? 
    projects.map((project, index) => (
      <Col sm={12} md={6} lg={4} key={index}>
        <ProjectCard project={project} />
      </Col>
    )) 
  : null}
</Row>
</marquee>
<div className='text-center mt-5'>
<button className='btn ' style={{textDecoration:"none"}} onClick={handleProjectsPage}>View More Projects</button>
</div>
    </div>
   
    </>
  )
}

export default Home