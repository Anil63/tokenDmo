
import React, { useEffect } from "react";
import "./Register.css";
import { useNavigate } from 'react-router-dom';


// interface Resisterdata {
//   email: string;
//   password: string | number;
// }

const defaultdata= {
  email: "",
  password: "",
};
const Login = () => {
  const [datas, setDatas] = React.useState(defaultdata);
  const { email, password } = datas;
  const navigate = useNavigate();

  const onChangeHander = (event) => {
    setDatas((prevSate) => ({
      ...prevSate,
      [event.target.id]: event.target.value,
    }));
  };
useEffect(()=>{
  const auth = localStorage.getItem('user');
  if(auth){
    navigate("/");
  }
},[])
 

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(datas);
    setDatas(defaultdata);
  };

  const onclickLogin = async () =>{
   let result = await fetch('http://localhost:4000/login',{
    method: 'POST',
    body: JSON.stringify(datas),
    headers: {
      'Content-Type': 'application/json'
    }
   });
   result = await result.json();
   console.log(result);
   if(result.auth){
    localStorage.setItem("user",JSON.stringify(result.user));
    localStorage.setItem("token",JSON.stringify(result.auth));
    navigate('/');
   
   }
   else{
    alert("please enter valid id password");
   }
  }
 
  return (
    <div>
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div className="f_res">
            <input
              className="inpreg"
              type="text"
              name="email1"
              placeholder="Enter email"
              id="email"
              value={email}
              onChange={onChangeHander}
            />
          </div>
          <div className="f_res">
            <input
              className="inpreg"
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              value={password}
              onChange={onChangeHander}
            />
          </div>
          <div className="tbnres">
            <button onClick={onclickLogin} className="tbn_sub">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
