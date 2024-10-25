import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  addProjectAPI } from '../Services/allAPI';
import { AddProjectContextResponse } from '../ContextAPI/ContextShare';

function Addproject() {
  const{addProjectResponse,setAddProjectResponse}=useContext(AddProjectContextResponse)
  const [show, setShow] = useState(false);
  const[projectData,setProjectData]=useState({
    title:"",language:"",github:"",website:"",overview:"",projectImage:""
  })
  const[fileStatus,setFileStatus]=useState(false)
  const[img,setimg]=useState('')
  const handleClose = () => {setShow(false);
    setProjectData({
        title:"",language:"",github:"",website:"",overview:"",projectImage:""}
    )
    setimg("")
  }
  const handleShow = () => setShow(true);
  useEffect(()=>{
    if (projectData.projectImage){
    // console.log(projectData.projectImage.type);
    if(projectData.projectImage.type=="image/png"||
      projectData.projectImage.type=="image/jpg" ||
      projectData.projectImage.type=="image/jpeg" ||
      projectData.projectImage.type=="image/svg"){
        // console.log("generate url");
        setimg(URL.createObjectURL(projectData.projectImage))
        // console.log(img);
        setFileStatus(false)
      }
    
    else{
      // console.log("wrong extension");
      setFileStatus(true)
      setProjectData({...projectData,projectImage:""})
    }}
  },[projectData.projectImage])
  // console.log(projectData);

const handleAddProject=async ()=>{
  const{ title,language,github,website,overview,projectImage}=projectData
  if(!title||!language||!github||!website||!overview||!projectImage){
    toast.warn("Fill Missing Fields")
  }
  else{
    // api calls reqBody
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)
    // api calls reqHeader
    const token =sessionStorage.getItem("token")
    console.log(token);
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
        ,"Content-Type":"multipart/form-data"
      } //api call
      try {
        const result=await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          setAddProjectResponse(result.data)
          handleClose()
        }
        else{
          console.error(result.response.data); 
        }    
      } catch (error) {
        console.log(error);
        
      }
    }
    
  
    // api call
    
    setShow(false)
  }
}


  return (
    
    <div>
      <ToastContainer position='top-center'/>
       <Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row" >
            <div className="col-6">
              <label >
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img src={img || "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"} width={"300px"} alt="" />
              </label>
              {fileStatus&& <div className='mt-3 text-danger'>Please upload either PNG,JPEG,JPG</div>}
            </div>
            <div className="col-6" style={{color:'white'}}>
              <div className="mb-3">
                <input type="text" style={{color:"white"}}  placeholder='project title' onChange={e=>setProjectData({...projectData,title:e.target.value})} value={projectData.title}/>
              </div>
              <div className="mb-3">
              <input type="text" style={{color:"white"}}  placeholder='Languages used' onChange={e=>setProjectData({...projectData,language:e.target.value})} value={projectData.language}/>
              </div>
              <div className="mb-3">
              <input type="text" style={{color:"white"}} placeholder='Github Link' onChange={e=>setProjectData({...projectData,github:e.target.value})} value={projectData.github} />
              </div>
              <div className="mb-3">
              <input type="text" style={{color:"white"}} placeholder='Website Link'onChange={e=>setProjectData({...projectData,website:e.target.value})} value={projectData.website}/>
              </div>
              <div className="mb-3">
              <input type="text" style={{color:"white"}} placeholder='Project Overview' onChange={e=>setProjectData({...projectData,overview:e.target.value})} value={projectData.overview}/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Add Project</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Addproject