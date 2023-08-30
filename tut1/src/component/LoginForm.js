import InputField from "./InputField";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      
    const [inputText, setInputText] = useState({username:"",password:""});
    const [invalidCred,setInvalidCred] = useState();
    const handleChange = (e) => {
        setInputText({...inputText, [e.target.name]: e.target.value})
      };
      const onSubmitFormRequest = (e)=> {
        e.preventDefault()
           axios.post("http://localhost:8081/authenticate",
           {
                ...inputText
           },headers).then((response) => {
            console.log(response.data)
            localStorage.setItem("jwtToken",response.data.jwtToken)
            localStorage.setItem("expiryTime",response.data.expiryTime)
            window.location.href = "/Home";
           }).catch((error)=>{
            if(error.response.status === 401) {
              setInvalidCred(error.response.data.message)
            }
           })
           setInputText({username:"",password:""})
           setInvalidCred()
      }
      // const config = {
      //   headers:{
      //     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSYW1lc2giLCJleHAiOjE2OTI0NzQwODEsImlhdCI6MTY5MjQ1NjA4MX0.bxT7odCSM_rLgMO-hiaJg8CgkeCajI-AcdGPgmsLtSeK6CKXA-a3OIQ6yfpScC98obMZ9lpGgUm4F86E4qAceA',
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // };
    return (
      // <input type="submit" onClick={() => {
      //   axios.get('http://localhost:8080/verify',config).then((res) => {
      //     console.log(res)
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // }}/>
        // <div className="row">
        // <div class="mx-auto col-10 col-md-8 col-lg-6">
        // <form className="form-example" onSubmit={onSubmitFormRequest}>
        // <div className="form-group">
        // <InputField type="text" placeholder="Name" name="username" onChange={handleChange} value={inputText.username}/>
        // </div>
        // <div className="form-group">
        // <InputField type="password" placeholder="Password" name="password" onChange={handleChange} value={inputText.password}/>
        // </div>
        // <input type="submit" />
        // </form>
        // </div>
        // </div>
<div class="row align-items-center" style={{height:"100vh"}}>
  <div class="mx-auto col-6 col-md-6 col-lg-4">
    <form class="form-example was-validated" onSubmit={onSubmitFormRequest}>
      <div class="form-group">
        <label for="username">Username:</label>
        <InputField
          type="text"
          className="form-control username"
          id="username"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={inputText.username}
          required={true}
        />
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">{ invalidCred !== undefined ? invalidCred : 'Please fill out this field.'}</div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <InputField
          type="password"
          className="form-control password"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={inputText.password}
          required={true}
        />
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">{ invalidCred !== undefined ? invalidCred : 'Please fill out this field.'}</div>
      </div>

      <button type="submit" class="btn btn-primary btn-customized mt-4">
        Login
      </button>
    </form>
  </div>
</div>
    );
}