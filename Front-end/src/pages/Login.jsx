import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css"

function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword]  = useState("")
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin =async(e)=>{
        e.preventDefault();
        setIsLoading(true);

        if (!email.trim()) {
        setError("Please enter an email");
        setIsLoading(false);
        return;
        }

        if (!password.trim()) {
        setError("Please enter a password");
        setIsLoading(false);
        return;
        }
        
        const payload  = {
            email,
            password
        }

        try {
            const response  = await fetch("https://library-app-g74n.onrender.com/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data)
            if (data.error) {
                setError(data.error);
              } else {
                setError("");
                if (data.token) {
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("role", data.role);
                  alert(`${data.message}`);
                  setEmail("");
                  setPassword("");
                  navigate("/books");
                  window.history.replaceState(null, null, "/books");
                } else {
                  alert(`${data.message}`);
                  setEmail("")
                  setPassword("")
                  setIsLoading(false)
                }
              }
        } catch (error) {
            alert(`Error while login in, ${error.message}`)
        }
        
    }

    return(
        <div className="container" id="loginContainer">
          <h1>Login Here</h1>
        {error && <div className="error">{error}</div>}
        <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <br />
        <button className="loginBtn" id="login" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
        </div>
    )
}

export default Login;