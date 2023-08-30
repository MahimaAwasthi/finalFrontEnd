import './App.css';
import LoginForm from './component/LoginForm';
import Home from './component/Home';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import DisplayAllCompanies from './component/DisplayAllCompanies';
import { useEffect, useState } from 'react';
import Logout from './component/Logout';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';



function App() {
  const [isLoggedIn,setisLoggedIn] = useState(false)
  useEffect(()=>{
   
   axios.get("http://localhost:8081/verify",{headers:{
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
   }}).then((res) => {
    if(res.status === 200) {
      setisLoggedIn(true)
    }
   }).catch((err) => {
    setisLoggedIn(false)
    console.log(err)
   })
  
    },[isLoggedIn])
  return (
    <div className="App">
     {/* <div>
      <LoginForm/>
     </div> */}
     <Router>
            { isLoggedIn === true ?
            <Routes>  
                 <Route exact path='/' element={< LoginForm />}></Route>  
                 <Route exact path='/home' element={< Home />}></Route>  
                 <Route exact path='/allCompanies' element={<DisplayAllCompanies/>}></Route>
                 <Route exact path='/Logout' element={<Logout/>}></Route>
            </Routes>  
            :
            <Routes>  
                 <Route exact path='/' element={< LoginForm />}></Route>  
                 <Route exact path='/home' element={< LoginForm />}></Route>  
                 <Route exact path='/allCompanies' element={<LoginForm/>}></Route>
            </Routes>  
            // window.location.replace('http://localhost:3001/')

}
     </Router>
     </div>
  );
}
export default App;
