import React from "react";
import {Link} from "react-router-dom"

function SignUp() {
  return (
    <div className="card-container">
      <div className="card card-wrapper">
        <h2 className="form-type my-heading">Instagram</h2>
        <input
          placeholder="Username"
          type="text"
          className="validate"
          name="name"
        />
        <input
          placeholder="Email"
          type="text"
          className="validate"
          name="email"
        />
        <input
          placeholder="Password"
          type="password"
          className="validate"
          name="password"
        />

        <Link className="waves-effect waves-light btn my-btn">SignUp</Link>
        <p className="redirect">
          Don't have an account ? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
