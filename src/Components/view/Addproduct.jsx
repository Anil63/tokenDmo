import React, { useState } from "react";
import "./css/addpro.css";

// interface addtitle {
//   name: string;
//   price: string;
//   category: string;
//   Company: string;
// }

const defaultdata= {
  name: "",
  price: "",
  category: "",
  Company: "",
};

const Addproduct = () => {
  const [adddata, setdata] = useState(defaultdata);
  const { name, price, category, Company } = adddata;
  const [error , setError] = useState(false);


  const onAddproduct = (event) => {
    setdata((preveSate) => ({
      ...preveSate,
      [event.target.id]: event.target.value,
    }));
  };
  const onSubadd = async (event) => {
    event.preventDefault();
    
    setdata(defaultdata);

    const userId =JSON.stringify(localStorage.getItem('user'));
    console.log(userId);  
    let result = await fetch("http://localhost:4000/add-product",{
      method:'post',
      body: JSON.stringify(adddata),
      headers: {
        "Content-Type": "application/json",
     
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    
        
      }
    }) ; 
    result = await result.json();
    console.log(result);

    if(!name || !price || !category || !Company)
    {
      setError(true);
      return false;
    }

  };

  return (
    <div>
      <div className="addmain">
        <h3 className="addprotitle">Add Products</h3>
        <form onSubmit={onSubadd}>
          <div className="addinp">
            <input
              className="addinps"
              type="text"
              name="name"
              placeholder="Enter Product Name"
              id="name"
              value={name}
              onChange={onAddproduct}
            />
           
          </div>
           {error && !name && <span>Enter valid name</span>}
          <div className="addinp">
            <input
              className="addinps"
              type="text"
              name="price"
              placeholder="Enter Product price"
              id="price"
              value={price}
              onChange={onAddproduct}
            />
            
          </div>
          {error && !price && <span>Enter valid price</span>}
          <div className="addinp">
            <input
              className="addinps"
              type="text"
              name="category"
              placeholder="Enter Product category"
              id="category"
              value={category}
              onChange={onAddproduct}
            />
             
          </div>
          {error && !category && <span>Enter valid category</span>}
          <div className="addinp">
            <input
              className="addinps"
              type="text"
              name="Company"
              placeholder="Enter Product Company"
              id="Company"
              value={Company}
              onChange={onAddproduct}
            />
            
          </div>
          {error && !Company && <span>Enter valid Company</span>}
          <div className="addprobtn">
            <button className="tbn_sub">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
