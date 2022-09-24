import React, { useEffect, useState } from "react";
import "./css/addpro.css";
import { useParams ,useNavigate } from "react-router-dom";

// interface addtitle {
//   name: string;
//   price: string;
//   category: string;
//   Company: string;

// }

// const defaultdata: addtitle = {
//   name: "",
//   price: "",
//   category: "",
//   Company: "",

// };

const Updateproduct = () => {
  // const [adddata, setdata] = useState(defaultdata);
  // const { name, price, category, Company } = adddata;

  const [name, setname] = useState([]);
  const [price, setprice] = useState([]);
  const [category, setcategory] = useState([]);
  const [company, setcompany] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:4000/pro/${params.id}`,{
      headers:{
        authorization:`bearer${JSON.parse(localStorage.getItem('token'))}`,
      }
    });
    result = await result.json();
    // console.warn(result);
    // setdata(result.adddata)
    setname(result.name);
    setprice(result.price);
    setcategory(result.category);
    setcompany(result.company);
  };

  // const onAddproduct = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setdata((preveSate) => ({
  //     ...preveSate,
  //     [event.target.id]: event.target.value,
  //   }));
  // };

  const onAddproductname = (event) => {
    setname(event.target.value);
  };

  const onAddproductprice = (event) => {
    setprice(event.target.value);
  };

  const onAddproductcar = (event) => {
    setcategory(event.target.value);
  };

  const onAddproductcom = (event) => {
    setcompany(event.target.value);
  };

  const updateProducts = async () => {
    console.warn(name,price,category,company)
    let result = await fetch(`http://localhost:4000/pro/${params.id}`,{
      method: 'POST',
      body:JSON.stringify({name,price,category,company}),
      headers: {
      'Content-Type':"application/json",
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
     
      
  
      }
    });
    result = await result.json()
    console.log(result);
    navigate('/')
  }

  return (
    <div>
      <div className="addmain">
        <h3 className="addprotitle">Update Products</h3>

        <div className="addinp">
          <input
            className="addinps"
            type="text"
            name="name"
            placeholder="Enter Product Name"
            id="name"
            value={name}
            onChange={onAddproductname}
          />
        </div>

        <div className="addinp">
          <input
            className="addinps"
            type="text"
            name="price"
            placeholder="Enter Product price"
            id="price"
            value={price}
            onChange={onAddproductprice}
          />
        </div>

        <div className="addinp">
          <input
            className="addinps"
            type="text"
            name="category"
            placeholder="Enter Product category"
            id="category"
            value={category}
            onChange={onAddproductcar}
          />
        </div>
        <div className="addinp">
          <input
            className="addinps"
            type="text"
            name="Company"
            placeholder="Enter Product Company"
            id="Company"
            value={company}
            onChange={onAddproductcom}
          />
        </div>
        <div className="addprobtn">
          <button onClick={updateProducts} className="tbn_sub">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updateproduct;
