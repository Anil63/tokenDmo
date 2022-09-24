import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Product = () => {
    const[ products , setProducts] = useState([]);
 
    
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () =>{
        let result = await fetch('http://localhost:4000/product',{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
        });
       let  resp = await result.json();
        console.log(resp);
      setProducts(resp);

      } 
const  deleteProduct  = async  (id) =>{
  let result = await fetch(`http://localhost:4000/pro/${id}`,{
    method: 'DELETE',
    
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
   
   
  });
  result= await result.json();
  if(result)
  {
    getProducts();
  }
}

const serachHandelr = async(event) =>{
  let key = event.target.value;
  let result = await fetch(`http://localhost:4000/search/${key}`,{
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result= await result.json();
  if(result){
    setProducts(result);
  }
}
  return (
    <div>
      <h2>products</h2>
      <div className="addinp">
            <input
              className="addinps"
              type="text"
              name="name"
              placeholder="search products..."
              id="serach"
              onChange={serachHandelr}
              
            
            />
           
          </div>
      {
        products.map((item, index )=>
      <ul key={item._id}><li>{index+1} </li>
      <li>{item.name}</li>
      <li>{item.price}</li>
      <li>{item.category}</li>
      <li>{item.company}</li>
     
      <li><button onClick={()=> deleteProduct(item._id)}>Delete</button></li>
        <Link to={'/update/'+item._id}>update</Link>
        
</ul>
        
        
        )
      }
    </div>
  )
}

export default Product
