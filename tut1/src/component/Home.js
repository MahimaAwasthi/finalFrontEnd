import axios from "axios"
import InputField from "./InputField";
import { useState } from "react"
import Logout from "./Logout";

const Home = () => {
    const [companyDetail,setCompanyDetail] = useState({companyName:"",technicalRequirement:"",experience:"",packageOffered:""})
    const handleChange = (e) => {
        setCompanyDetail({...companyDetail, [e.target.name]: e.target.value})
        console.log(companyDetail)
      };
    // useEffect(()=> {
    //     axios.get("http://localhost:8080/company/showAllCompanies",{headers:{
    //         'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    //     }}).then((res)=> {
    //         console.log(res)
    //         setAllCompanies(res.data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // },[])
    const saveCompanyName = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8081/company/addCompanyProfile",companyDetail,{headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }})
    }
    return (
        // <div>
        //     <Logout/>
        //     <a href="/allCompanies"> showAllCompanies </a>
        //     <form onSubmit={saveCompanyName}>
        //     <InputField type="text" name="companyName" placeholder="Company Name"  onChange={handleChange} value={companyDetail.companyName}/>
        //     <InputField type="text" name="technicalRequirement" placeholder="Technical Requirement"  onChange={handleChange} value={companyDetail.technicalRequirement}/>
        //     <InputField type="text" name="experience" placeholder="Experience"  onChange={handleChange} value={companyDetail.experience}/>
        //     <InputField type="text" name="packageOffered" placeholder="Package Offered"  onChange={handleChange} value={companyDetail.packageOffered}/>
        //     <input type="submit" />
        //     </form>
        // </div>
<>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="/allCompanies"> All Companies </a>
<form class="ms-auto form-inline ">
<Logout className="btn btn-outline-danger my-2 my-sm-0"/>
</form>
</nav>
<div class="row align-items-center" style={{height:"100vh"}}>
  <div class="mx-auto col-6 col-md-6 col-lg-4">
    <form class="form-example was-validated" onSubmit={saveCompanyName}>
      <div class="form-group">
        <label for="companyName">Company Name:</label>
        <InputField
          type="text"
          className="form-control username"
          id="companyName"
          placeholder="companyName"
          name="companyName"
          onChange={handleChange}
          value={companyDetail.companyName}
          required={true}
        />
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
      </div>
      <div class="form-group">
        <label for="technicalRequirement">Technical Requirement:</label>
        <InputField
          type="text"
          className="form-control password"
          id="technicalRequirement"
          placeholder="technicalRequirement"
          name="technicalRequirement"
          onChange={handleChange}
          value={companyDetail.technicalRequirement}
          required={true}
        />
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
      </div>

      <div class="form-group">
        <label for="Experience">Experience:</label>
        <InputField
          type="number"
          className="form-control password"
          id="Experience"
          placeholder="Experience"
          name="experience"
          onChange={handleChange}
          value={companyDetail.experience}
          required={true}
        />
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
      </div>

      <div class="form-group">
        <label for="Experience">Package Offered:</label>
        <InputField
          type="number"
          className="form-control password"
          id="packageOffered"
          placeholder="packageOffered"
          name="packageOffered"
          onChange={handleChange}
          value={companyDetail.packageOffered}
          required={true}
        />
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
      </div>

      <button type="submit" class="btn btn-primary btn-customized mt-4">
        Submit
      </button>
    </form>
  </div>
</div>
</>
    )
}

export default Home