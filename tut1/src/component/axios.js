import axios from 'axios';

var allcookies = document.cookie;
var cookiearray = allcookies.split(';');
for(var i=0; i<cookiearray.length; i++) {
  var name = cookiearray[i].split('=')[0];
  var value = cookiearray[i].split('=')[1];
  // console.log("Key is : " + name + " and Value is : " + value);
  if(name.includes("Authentication")) {
    console.log(value)
    axios.defaults.headers.common = {'Authorization': 'Bearer ' + value}
  }
}   

export default axios;