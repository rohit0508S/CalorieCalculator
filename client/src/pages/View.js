import React,{useState,useEffect} from 'react';
import {useParams,Link} from "react-router-dom";
import axios from 'axios';
import "./View.css"


const View=()=>{
const [user,setUser]=useState({});
const{id}=useParams();
useEffect(()=>{
    axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=>setUser({...resp.data[0]}));
   },[id]);

    return(
        <div style={{margintop:"150px"}}>
            <div className='card'>
               <div className='card-header'>
                <p>User contact Detail</p>
               </div>
               <div className='container'>
                <strong>ID:</strong>
                <span>{id}</span>
                <br/>
                <br/>

                <strong>Name:</strong>
                <span>{user.name}</span>
                <br/>
                <br/>
                <strong>Food:</strong>
                <span>{user.food}</span>
                <br/>
                <br/>
                <strong>Calorie:</strong>
                <span>{user.calorie}</span>
                <br/>
                <br/>
                <strong>Quantity:</strong>
                <span>{user.quantity}</span>
                <br/>
                <br/>
                <Link to="/">
                <button className='btn btn-edit'>Go back</button>
                </Link>
               </div>
                </div>
        </div>
    )
}
export default View;