const Logout = ({className,style})=> {
return(
    <div>
        <input className={className} style={style} type="submit" value="Logout" onClick={()=> {
            localStorage.removeItem("jwtToken")
            localStorage.removeItem("expiryTime")
            window.location.href = "/";
        }}/>
    </div>
)
}

export default Logout