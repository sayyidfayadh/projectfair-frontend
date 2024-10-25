import React, { createContext, useState } from 'react'
export const AddProjectContextResponse=createContext()
function ContextShare({children}){
  const[addProjectResponse,setAddProjectResponse]=useState("")
  return(
    <>
    <AddProjectContextResponse.Provider value={{addProjectResponse,setAddProjectResponse}}>
    {children}
    </AddProjectContextResponse.Provider>
    </>
  )
}
export default ContextShare