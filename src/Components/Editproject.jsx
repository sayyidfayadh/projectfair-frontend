import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Server_URL } from "../Services/Server_URL";
import { toast, ToastContainer } from "react-toastify";
import { editProjectApi } from "../Services/allAPI";

function Editproject({project}) {
  // console.log(project);
  
  const[fileStatus,setFileStatus]=useState(false)
  const [show, setShow] = useState(false);
  const [projectData,setProjectData]=useState({
    id:project._id,title:project.title,language:project.language,github:project.github,website:project.website,overview:project.overview,projectImage:""
  })
  
const[preview,setPreview]=useState("")
  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: "",
    });
    setPreview(projectData.projectImage);
  };
  const handleShow = () => setShow(true);
  useEffect(()=>{
    if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else{
      setPreview("")
    }
  },[projectData.projectImage])

  const handleUpdate= async()=>{
    const{ id,title,language,github,website,overview,projectImage}=projectData
    if(!title||!language||!github||!website||!overview){
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
     preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
      // api calls reqHeader
      const token =sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "authorization":`Bearer ${token}`,
          "Content-Type":preview ?`multipart/form-data`:`application/json`
        }
        try {
          //api call
          const result=await editProjectApi(id,reqBody,reqHeader)
          if(result.status===200){
            handleClose()
          }
          else{
            toast.warn(result.response.data)
          }
          
        } catch (error) {
          console.log(error);
          
        }
        
      }
      else{
        toast.warn("cant fetch token")
      }
  }
}

  return (
    <div>
      <button onClick={handleShow} className="btn text-dark"><i className="fa-solid fa-pen-to-square"></i></button>

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
          <div className="row">
          <div className="col-6">
              <label >
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img src={preview?preview :`${Server_URL}/upload/${project?.projectImage}` } width={"300px"} alt="" />
              </label>
              {fileStatus&& <div className='mt-3 text-danger'>Please upload either PNG,JPEG,JPG</div>}
            </div>
            <div className="col-6">
            <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Project title"
              value={projectData.title}
              onChange={e=>setProjectData({...projectData,title:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Languages Used"
              value={projectData.language}
              onChange={(e)=>setProjectData({...projectData,language:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Github Link"
              value={projectData.github}
              onChange={e=>setProjectData({...projectData,github:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Website Link"
              value={projectData.website}
              onChange={e=>setProjectData({...projectData,website:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Project Overview"
              value={projectData.overview}
              onChange={e=>setProjectData({...projectData,overview:e.target.value})}
            />
          </div>
            </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Editproject;
