import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signUpUser = () => {
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          alert(result.error);
        } else if(result.messege) {
          alert(result.messege);
        } else {
          alert(result.message)
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card-container">
      <div className="card card-wrapper">
        <h2 className="form-type my-heading">Instagram</h2>
        <input
          placeholder="Username"
          type="text"
          value={name}
          className="validate"
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
        />
        <input
          placeholder="Email"
          value={email}
          type="text"
          className="validate"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          className="validate"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
        />

        <button
          type="submit"
          onClick={signUpUser}
          className="waves-effect waves-light btn my-btn"
        >
          SignUp
        </button>
        <p className="redirect">
          Don't have an account ? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
