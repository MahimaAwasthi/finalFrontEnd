import { useEffect,useState } from "react"
import axios from "axios"
import InputField from "./InputField"
import ExcelDownloadButton from "./ExcelDownloadButton"
import Logout from "./Logout"

const DisplayAllCompanies = ()=> {
    const [companyDetail,setAllCompanies] = useState([])
    const [updatedCompanyDetail,setUpdatedCompanyDetail] = useState({companyName:"",technicalRequirement:"",experience:"",packageOffered:""})
    const [totalPages,setTotalPages] = useState()
    const [activePage,setActivePage] = useState(0)
    const [isEditEnable,setIsEditEnable] = useState()
    const liIndices = Array.from({ length : totalPages }, (_, index) => index + 1);
    const handleChange = (e) => {
        setUpdatedCompanyDetail({...updatedCompanyDetail, [e.target.name]: e.target.value})
        console.log(updatedCompanyDetail)
      };

        useEffect(()=> {
        axios.get(`http://localhost:8081/company/showAllCompanies/${activePage}/10`,{headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }}).then((res)=> {
            console.log(res.data)
            // for(let i =0;i<res.data.length;i++){
            // console.log(res.data[i])
            setAllCompanies(res.data.companyProfileEntityList)
            setTotalPages(res.data.totalPages)
            console.log(totalPages)
            // }
        }).catch((err) => {
            console.log(err)
        })
    },[companyDetail.length,activePage])
    const headers = ['ID', 'Company Name', 'Technical Requirement','Experience','Package Offered'];
const updateDetails = (e) => {
    axios.put(`http://localhost:8081/company/modifyCompanyProfile/${isEditEnable}`,updatedCompanyDetail,{
        headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }
    }).then((res) => {
        setAllCompanies(companyDetail.map((company) => {
            if(company.id === isEditEnable) {
                return {...res.data,id:isEditEnable}
            }
            return company
        }))
        console.log(res.data)
        console.log(companyDetail)
        console.log(isEditEnable)
        setIsEditEnable()
    }).catch((err)=> {
        console.log(err)
    })
}

return(
    // <div>
    //     <Logout/>
    //     <a href="/Home"> Home </a>
    //     <ExcelDownloadButton headers={headers} tableData = {companyDetail}></ExcelDownloadButton>
    //     {
    //     companyDetail.map((comp)=> {
    //         return(
    //     <form >
    //         <InputField  id type="text" name="companyName" placeholder="Company Name"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.companyName :comp.companyName} disabled={isEditEnable === comp.id ? false : true}/>
    //         <InputField  type="text" name="technicalRequirement" placeholder="Technical Requirement"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.technicalRequirement :comp.technicalRequirement} disabled={isEditEnable === comp.id ? false : true}/>
    //         <InputField type="text" name="experience" placeholder="Experience"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.experience :comp.experience} disabled={isEditEnable === comp.id ? false : true}/>
    //         <InputField type="text" name="packageOffered" placeholder="Package Offered"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.packageOffered :comp.packageOffered} disabled={isEditEnable === comp.id ? false : true}/>
    //         <input type="submit" value="delete" onClick={(e)=> {
    //             axios.delete(`http://localhost:8081/company/deleteCompanyProfile/${comp.id}`,{headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    //             }}).then((res) => {
    //                 console.log(res.data)
    //             }).catch((e)=> {
    //                 console.log(e)
    //             })
    //         }}/>
    //         {
    //             isEditEnable === comp.id ?
    //             <input type="submit" value="Save" onClick={updateDetails} />
    //         :<input type="submit" value="Edit" onClick={(e)=> {
    //             e.preventDefault()
    //             console.log(comp.id)
    //             setIsEditEnable(comp.id)
    //             setUpdatedCompanyDetail({companyName:comp.companyName,packageOffered:comp.packageOffered,technicalRequirement:comp.technicalRequirement,experience:comp.experience})
    //         }} />
    //     }
    //         </form>
    //         )
    //     })}
    // </div>
<>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="/Home"> Add Company </a>
<ExcelDownloadButton className="nav-item btn"  headers={headers} tableData = {companyDetail}></ExcelDownloadButton>
<form class="ms-auto form-inline ">
<Logout className="btn btn-outline-danger my-2 my-sm-0"/>
</form>
</nav>    
<div class="row align-items-center" style={{height:"100vh"}}>      
  <table class="table">
    <thead>
      <tr>
        <th>Company Name</th>
        <th>Technical Requirement</th>
        <th>Experience</th>
        <th>Package Offered</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>   
    {companyDetail.map((comp)=> {
        return (  
        <tr>
             <td><InputField className="form-control"  id type="text" name="companyName" placeholder="Company Name"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.companyName :comp.companyName} disabled={isEditEnable === comp.id ? false : true}/></td>
             <td><InputField  className="form-control" type="text" name="technicalRequirement" placeholder="Technical Requirement"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.technicalRequirement :comp.technicalRequirement} disabled={isEditEnable === comp.id ? false : true}/></td>
             <td><InputField className="form-control" type="text" name="experience" placeholder="Experience"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.experience :comp.experience} disabled={isEditEnable === comp.id ? false : true}/></td>
             <td><InputField className="form-control" type="text" name="packageOffered" placeholder="Package Offered"  onChange={handleChange} value={isEditEnable === comp.id ? updatedCompanyDetail.packageOffered :comp.packageOffered} disabled={isEditEnable === comp.id ? false : true}/></td>
             <td> <input type="submit" className="btn btn-outline-danger" value="Delete" onClick={(e)=> {
                e.preventDefault()
                axios.delete(`http://localhost:8081/company/deleteCompanyProfile/${comp.id}`,{headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                }}).then((res) => {
                    setAllCompanies(companyDetail.splice(comp.id,1))
                    console.log(res.data)
                }).catch((e)=> {
                    console.log(e)
                })
            }}/>
            {
                isEditEnable === comp.id ?
                <input type="submit" className="btn btn-outline-success" value="Save" onClick={updateDetails} />
            :<input type="submit" className="btn btn-outline-success" value="Edit" onClick={(e)=> {
                e.preventDefault()
                console.log(comp.id)
                setIsEditEnable(comp.id)
                setUpdatedCompanyDetail({companyName:comp.companyName,packageOffered:comp.packageOffered,technicalRequirement:comp.technicalRequirement,experience:comp.experience})
            }} /> } </td>
        </tr>
        )
    })}
    </tbody>
  </table>
</div>
<nav aria-label="Page navigation example">
    {console.log(activePage)}
  <ul class="pagination">
    {
liIndices.map((index) => {
    return(
    <>
    <li class="page-item"><button type="submit" onClick={(e)=> {
        setActivePage(index-1)
    }} class="page-link">{index}</button></li>
    </>
    )
})
 
}
  </ul>
</nav>
</>
)
}

export default DisplayAllCompanies
