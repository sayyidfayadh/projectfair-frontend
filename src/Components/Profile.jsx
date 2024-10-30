import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getExistingProfileDataAPI,
  updateProfileAPI,
} from "../Services/allAPI";
import { Server_URL } from "../Services/Server_URL";

function Profile() {
  const [preview, setPreview] = useState(false);
  const [existingProfileData, setExistingProfileData] = useState({
    username: "",
    email: "",
    profile: "",
    github: "",
    linkedin: "",
  });
  console.log(existingProfileData);

  const [profileData, setProfileData] = useState({
    profile: "",
    github: "",
    linkedin: "",
  });
  // console.log(profileData);
  const getExistingProfileData = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      try {
        const result = await getExistingProfileDataAPI(reqHeader);
        if (result.status == 200) {
          // toast.success("fetched existing pdata")
          // console.log(result.data);
          setExistingProfileData(result.data);
          setProfileData(result.data);
        } else {
          console.log(result.response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getExistingProfileData();
  }, []);
  
  useEffect(() => {
    const imgType = profileData.profile?.type;
    if (
      imgType == "image/jpg" ||
      imgType == "image/jpeg" ||
      imgType == "image/png"
    ) {
      setPreview(URL.createObjectURL(profileData.profile));
    } else {
      console.log("extension error");
      setPreview("");
    }
  }, [profileData.profile, existingProfileData.profile]);
  const [open, setOpen] = useState(false);
  const[filestatus,setFileStatus]=useState(true)

  const handleUpdate = async () => {
    const { profile, github, linkedin } = profileData;
    const isProfileChanged =
      profile &&
      profile.name !== existingProfileData.profile &&
      (profile.size !== existingProfileData.profile.size ||
        profile.lastModified !== existingProfileData.profile.lastModified);
    if (
      isProfileChanged ||
      github !== existingProfileData.github ||
      linkedin !== existingProfileData.linkedin
    ) {
      const reqBody = new FormData();
      reqBody.append("profile", profile);
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);

      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };

        try {
          const result = await updateProfileAPI(reqBody, reqHeader);
          if (result.status == 200) {
            toast.success("profile updated");
            setExistingProfileData(profileData);
            setOpen(false);
          } else {
            console.log(result.response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      toast.info("nothing to update");
    }
  };
  return (
    <div>
      <div
        className="card  p-5 mt-3 me-2"
        style={{ backgroundColor: "transparent", border: "1px solid" }}
      >
        <div className="d-flex justify-content-between">
          <h2>{existingProfileData.username}'s Profile</h2>
          <button onClick={() => setOpen(!open)} className="btn ">
            <i className="fa-solid fa-angle-down "></i>
          </button>
        </div>
        <Collapse in={open}>
          <div>
            <div className=" justify-content-center align-items-center">
              <label className="d-flex justify-content-center align-items-center">
                <input
                  type="file"
                  accept=".jpg ,jpeg,.png"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      profile: e.target.files[0],
                    });
                  }}
                />
                <img
                  className="text-center  my-2"
                  src={
                    preview ||
                    `${Server_URL}/upload/${existingProfileData?.profile}` ||
                    "https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232026-stock-illustration-male-default-avatar-profile-gray.jpg"
                  }
                  width={"200px"}
                  alt=""
                />
              </label>
              {filestatus ? (
                ""
              ) : (
                <p className="text-danger text-center">
                  Add an image with the extension jpg/png/jpeg
                </p>
              )}
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Github Link"
                  className="form-control"
                  value={profileData.github}
                  onChange={(e) => {
                    setProfileData({ ...profileData, github: e.target.value });
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder="Linkedin Link"
                  className="form-control"
                  value={profileData.linkedin}
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      linkedin: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="d-grid mt-3">
                <button className="btn btn-success" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default Profile;
