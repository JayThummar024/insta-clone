import React ,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch} from "react-redux"
import {userLogin} from "../redux/actions"

function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const dispatch = useDispatch()

  const loginUser = () => {
    fetch("http://localhost:5000/signin" , {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }).then(res=>res.json())
    .then(result=>{
      if(result.error){
        alert(result.error)
      }else{
        localStorage.setItem("jwt",result.token)
        localStorage.setItem("user",JSON.stringify(result.user))
        dispatch(userLogin(result.user))
        history.push("/")
      }
      
    })
    .catch(err=>{console.log(err)})
  }

  return (
    <div className="card-container">
      <div className="card card-wrapper">
        <h2 className="form-type my-heading">Instagram</h2>
        <input
          placeholder="Email"
          type="text"
          className="validate"
          value={email}
          name="email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="validate"
          value={password}
          name="password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit" onClick={loginUser} className="waves-effect waves-light btn my-btn">Login</button>
        <p className="redirect">Don't have an account ? <Link to="/signup">SignUp</Link></p>
      </div>
    </div>
  );
}

export default SignIn;
