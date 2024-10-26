import { commonAPI } from "./CommonAPI";
import { Server_URL } from "./Server_URL";
//register api
export const registerAPI=async (user)=>{
  return await commonAPI("POST",`${Server_URL}/register`,user,"")
}
//login api
export const loginAPI=async (user)=>{
  return await commonAPI("POST",`${Server_URL}/login`,user,"")
}

//addprojectApi
export const addProjectAPI=async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${Server_URL}/addproject`,reqBody,reqHeader)
}
//getmarqueeproject api
export const getMarqueeProjectAPI=async ()=>{
  return await commonAPI("GET",`${Server_URL}/homeprojects`)
}
// get user project api
export const getUserProjectApi=async (reqHeader)=>{
  return await commonAPI('GET',`${Server_URL}/userprojects`,"",reqHeader)
 
}
//getallprojects
export const getAllProjectsAPI=async(searchKey,reqHeader)=>{
  return await commonAPI('GET',`${Server_URL}/allprojects?search=${searchKey}`,"",reqHeader)
}
//edit project api
export const editProjectApi=async(id,reqBody,reqHeader)=>{
  return await commonAPI('PUT',`${Server_URL}/projects/edit/${id}`,reqBody,reqHeader)
}
//delter project
export const deleteProjectAPI=async(id,reqHeader)=>{
  return await commonAPI('DELETE',`${Server_URL}/projects/delete/${id}`,{},reqHeader)
}