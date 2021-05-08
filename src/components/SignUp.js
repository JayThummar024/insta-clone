import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    } 
  }, [url]);

  const signUpUser = () => {
    if(image){
      uploadProfilePic()
    }else{
      uploadFields()
    }
  }

  const uploadFields = () => {
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        profilePic:url
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          alert(result.error);
        } else if (result.messege) {
          alert(result.messege);
        } else {
          alert(result.message);
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  const uploadProfilePic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "jay-cloud024");

    fetch("https://api.cloudinary.com/v1_1/jay-cloud024/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        setUrl(result.url);
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
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="add image"
            />
          </div>
        </div>

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
