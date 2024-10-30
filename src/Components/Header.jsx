import React from "react";
import { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TokenAuthContext } from "../ContextAPI/TokenAuth";

function Header({ insideDashboard }) {
  const {isAuthorized, setIsAuthorized} = useContext(TokenAuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setIsAuthorized(false);
    navigate("/");
  };
  return (
    <div>
      <Navbar
        className=" p-3 w-100"
        style={{ borderBottom: "1px solid white" }}
      >
        <div className="container-fluid">
          <Navbar.Brand className="">
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <i className="fa-solid fa-list-check me-2"></i>
              Project Fair{" "}
            </Link>
          </Navbar.Brand>
          {insideDashboard && (
            <Button
              className="btn btn-rounded btn-danger d-flex flex-end"
              onClick={handleLogOut}
            >
              LogOut
            </Button>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
