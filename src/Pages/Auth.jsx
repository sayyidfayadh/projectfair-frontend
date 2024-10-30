import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/allAPI";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TokenAuthContext } from "../ContextAPI/TokenAuth";

function Auth({register}) {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  const navigate=useNavigate();
  const[userData,setUserData]=useState({
    username:"",email:"",password:""
  })
  // console.log(userData);
  const handleRegister=async (e)=>{
    e.preventDefault()
    const {username,email,password}=userData
    if(!username || !email || !password){
      toast.warn("fill empty field")
    }
    else{
      // alert("registered")
      //API CALL
      try {
        const result= await registerAPI(userData)
        // console.log(result);
        if(result.status===200){
          toast.success(`${result.data.username} has susccesfully registered`)
          navigate('/login')
          setUserData({username:"",email:"",password:""})
        }
        else{
    toast.warn(result.response.data)
        }
        
      } catch (error) {
        console.error(error)
        
      }

    }
  }
  const handleLogin=async (e)=>{

e.preventDefault()
    const {email,password}=userData
    if(!email || !password){
      
      toast.warn("fill empty field")
    }
    else{
      // alert("registered")
      //API CALL
      try {
        const result= await loginAPI({email,password})
        // console.log(result);
        if(result.status===200){
         sessionStorage.setItem("username",result.data.existingUser.username)
         sessionStorage.setItem("token",result.data.token)
         navigate('/')
         setIsAuthorized(true)
         setUserData({email:"",password:""})
        }
        else{
          toast.warn(result.response.data)
        }
        
      } catch (error) {
        console.error(error)
      }

    }
  }
  const isRegisterForm = register ? true : false;
  return (
    <div>
      
      <ToastContainer position="top-center" style={{color:'white'}}/>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="container w-75">
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            <i className="fa-solid fa-arrow-left">back to home</i>
          </Link>
          <div className="card shadow  mt-5 " style={{border:"1px solid white"}}>
            <div className="row align-items-center " style={{minHeight:'50vh'}}>
              <div className="col-lg-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7380/7380525.png"
                  width={"50%"}
                  alt=""
                />
              </div>
              <div className="col-lg-6">
                <h1 className="fw-bolder ">
                  <i className="fa-solid fa-list-check me-2"></i>Project Fair{" "}
                </h1>
                <h5 className="">
                  {isRegisterForm
                    ? "Signup to your account"
                    : "Sign in to your account"}
                     </h5>
                  <Form className="w-100 mt-3">
                    {isRegisterForm && (
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInputName"
                      >
                        <Form.Control
                          type="name"
                          placeholder="Enter your username"
                          onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}
                        />
                      </Form.Group>
                    )}
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInputEmail"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter you Email"
                        onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}
      
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInputPswd"
                     
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter you password"
                        onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}
                  
                      />
                    </Form.Group>
                  </Form>
                {
                  isRegisterForm?
                  <div>
                    <button className="btn btn-dark text-light m-3 d-grid" onClick={handleRegister}>Register</button>
                    <p>Already have an account? Click here... <Link to={'/login'} style={{textDecoration:"none",color:"green"}}>Login</Link></p>
                  </div>:
                  <div>
                  <button className="btn btn-dark text-light m-3 d-grid" onClick={handleLogin}>Login</button>
                  <p>New User? Click here... <Link to={'/register'} style={{textDecoration:"none",color:"red"}}>Register</Link></p>
                </div>
                }
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
