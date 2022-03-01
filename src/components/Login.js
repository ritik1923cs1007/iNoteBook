import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
const Login = () => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let history=useHistory();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
             
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            history.push("/");
        }
        else
        {
            alert('Invalid credentials')
        }
    }
    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    return (
        <div className="container">
             <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="email" onChange={onchange}/>
                                    </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password"  value={credentials.password} id="password" onChange={onchange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
