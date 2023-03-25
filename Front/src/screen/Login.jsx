// import React from 'react'
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export const Login = () => {
  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3333/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const jsonDate = await response.json();
    // console.log(jsonDate);
    if (!jsonDate.success) {
      alert("Enter valid Credential");
      
    }
    if (jsonDate.success) {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", jsonDate.authToken)
      // console.log(localStorage.getItem("authToken"))
      navigate('/');
    
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          

          <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            New User!!
          </Link>
        </form>
      </div>
    </>
  )
}
