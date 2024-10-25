import React from 'react'
import proimage from '../assets/images/Developer Tools-01.png'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import { useState } from 'react';
import { Server_URL } from '../Services/Server_URL';

function ProjectCard({project}) {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


  return (
    <div>

<Card style={{ width: '18rem' }}>
      <Card.Img variant="top"src={`${Server_URL}/upload/${project?.projectImage}`} width={'400px'} height={'200px'} onClick={handleShow} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <Row>
        <Col md={6}>
        <Card.Img variant="top"src={`${Server_URL}/upload/${project?.projectImage}`} width={'400px'} height={'200px'} onClick={handleShow} />
        <h2 className=''>{project?.title}</h2>
        <p><span className='fw-bolder'>Project Overview</span>::{project?.overview}</p>
        <p><span className='text-warning'>Languages Used</span>:{project?.language}</p>
        </Col>
      </Row>
        </Modal.Body>
        
        <Modal.Footer className='bg-dark p-0'>
          <div className='mt-2 w-100 p-0'>
            <a href="" target="_blank" className='me-3 btn text-dark border' > <i className='fa-brands fa-github fa-2x'></i></a>
            <a href="" className='me-3 btn text-dark border'><i className='fa-solid fa-link fa-2x'></i></a>        
            </div>
          
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default ProjectCard