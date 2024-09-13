import { useNavigate } from "react-router-dom"


function Home(){
    const navigate = useNavigate();

    const handleRegister = ()=>{
        navigate("/register")
    }
    const handleLogin = ()=>{
        navigate("/login")
    }

    return(
        <>
        <div className="container">
            <h1>Welcome to Library App</h1>
            <img src="https://t4.ftcdn.net/jpg/04/70/59/57/360_F_470595705_hF9qvx9bGmeKdIrc5stzdcjPlGsY9dg8.jpg" alt="" />
            <div className="homeBtn">
                <button className="registerBtn" onClick={handleRegister}>Register</button>
                <br />
                <button className="loginBtn" onClick={handleLogin}>Login</button>
            </div>
        </div>
        </>
    )
}

export default Home