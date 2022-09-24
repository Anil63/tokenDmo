import React, { useEffect } from "react";
import "./Register.css";
import { useNavigate} from 'react-router-dom';

// interface Resisterdata {
//   name: string;
//   email: string;
//   password: string | number;
// }

const defaultdata = {
  name: "",
  email: "",
  password: "",
};
const Register = () => {
  const [data, setData] = React.useState(defaultdata);
  const { name, email, password } = data;
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
        }

  })

  const onChangeHander = (event) => {
    setData((prevSate) => ({
      ...prevSate,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    setData(defaultdata);

   

   

    let redata = await fetch('http://localhost:4000/register',{
      method: 'POST',
      body:JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
     
    },
    });
    redata  = await redata.json();
    console.log(redata);
    localStorage.setItem("user",JSON.stringify(redata.result))
    localStorage.setItem("token",JSON.stringify(redata.auth))
  


   navigate('/')
   
  };

  return (
    <div>
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div className="f_res">
            <input
              className="inpreg"
              type="text"
              name="name"
              placeholder="Enter full name"
              id="name"
              value={name}
              onChange={onChangeHander}
            />
          </div>
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
            <button className="tbn_sub">Sing up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
