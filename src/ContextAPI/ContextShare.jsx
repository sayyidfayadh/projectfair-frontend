import React, { createContext, useState } from 'react'
export const AddProjectContextResponse=createContext()
export const EditProjectContextResponse=createContext()
function ContextShare({children}){
  const[addProjectResponse,setAddProjectResponse]=useState("")
  const[editProjectResponse,setEditProjectResponse]=useState("")
  return(
    <>
    <AddProjectContextResponse.Provider value={{addProjectResponse,setAddProjectResponse}}>
    <EditProjectContextResponse.Provider value={{editProjectResponse,setEditProjectResponse}}>
    {children}
    </EditProjectContextResponse.Provider>
    </AddProjectContextResponse.Provider>

    

    </>
  )
}
export default ContextShare