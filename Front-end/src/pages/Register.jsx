import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Register.css"

function Register(){
    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        const payload = {
            name,
            email,
            password
        }
        try {
            await fetch("https://library-app-g74n.onrender.com/user/register",{
                method:"POST",
                headers:{   
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(payload)
            });
            alert("User registered successfully")
            setIsLoading(false)
            navigate("/login")
        } catch (error) {
            alert(`Error while registering, ${error}`)
            setIsLoading(false)
        }
    }

    return(
        <div className="container" id="registerContainer">
            <h1>Register Here</h1>
            <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} />
            <br />
            <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <br />
            <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <br /><br />
            {isLoading ? (<button className="registerBtn">Loading...</button> ): (<button className="registerBtn" onClick={handleSubmit} disabled={isLoading}>Register</button> ) }

        </div>
    )
}

export default Register