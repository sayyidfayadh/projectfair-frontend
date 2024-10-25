import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectsAPI } from '../Services/allAPI'


function Projects() {
  const [projects,setProjects]=useState([])
  const getAllProjects=async()=>{
    const token=sessionStorage.getItem("token")
      // console.log(token);
      if(token){
        const reqHeader={
          "authorization":`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
        //api call
        try{
        const result=await getAllProjectsAPI(reqHeader)
        if(result.status===200){
          setProjects(result.data)
        }
        else{
          console.log(result);
          
        }
      }
      catch(error){
        console.error("api failure",error)

      }
     
      // console.log(projects);
      
    }
    else{
      console.log("token not found from sstorage");
      
    }
    
  }
  useEffect(()=>{
    getAllProjects()
  },[])
  return (
    <>
    <Header/>
    <div className='projects'style={{marginTop:"100px"}}>
     <h1 className='text-center mt-5 fw-bolder'>All Projects</h1> 
    <div className='d-flex justify-content-center align-items-center w-100'>
    <div className='d-flex border w-50 rounded mb-3'>
      <input type="text" className='form-control' placeholder='search by technologies' />
      <i style={{marginLeft:'-50px',backgroundColor:"white"}} className='fa-solid fa-magnifying-glass fa-rotate-90 '></i>
    </div>
    </div>
    <Row className='mt-5 container'>
      { projects.length>0?projects.map((project,index)=>(
          <Col sm={12} md={6} lg={4} key={index}>
          <ProjectCard project={project}/>
            </Col>
        )):<p>Add your first project</p>
      }
    
    </Row>
    </div>


    </>
  )
}

export default Projects