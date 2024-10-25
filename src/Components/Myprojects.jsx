import React, { useContext, useEffect, useState } from "react";
import Addproject from "./Addproject";
import { getUserProjectApi } from "../Services/allAPI";
import { AddProjectContextResponse } from "../ContextAPI/ContextShare";
import Editproject from "./Editproject";
function Myprojects() {
  const { addProjectResponse, setAddProjectResponse } = useContext(
    AddProjectContextResponse
  );
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getUserProjects();
  }, [addProjectResponse]);

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token");
    // console.log(token);
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      try {
        const result = await getUserProjectApi(reqHeader);
        if (result.status === 200) {
          // console.log(result);
          setProjects(result.data);
        } else {
          console.error(" error", result);
        }
      } catch (error) {
        console.error("api call failed", error);
      }
    } else {
      console.log("token not found in sstorage");
    }
  };
  // console.log(projects);

  return (
    <div>
      <div
        className="card  shadow p-3 mt-5"
        style={{ backgroundColor: "#040E31", border: "1px solid white" }}
      >
        <div className="d-flex">
          <h2>My Projects</h2>
        </div>
        <div className="ms-auto">
          <Addproject />
        </div>
        <div className="mt-4">
          {/* collection of user project */}
          {projects?.length > 0 ? (
            projects.map((project, index) => (
              <div
                className="border d-flex align-items-center rounded p-3"
                key={index}
              >
                <h3>{project?.title}</h3>
                <div className="d-flex ms-auto">
                  <button className="btn ">
                    <Editproject project={project}/>
                  </button>
                  <a href={project?.github} className="me-3 btn">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <button className="btn">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>Add Your First Project</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Myprojects;
