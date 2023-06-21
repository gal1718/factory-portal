import {  useState } from "react"
import axios from 'axios';
import { loginUrl } from '../../constans';
import { useNavigate } from "react-router-dom";


const Login = ({setUser}) => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    



    const handleLogin = async () => {

        const loginData = {
            username,
            email
        }

        const res = await axios.post(loginUrl, loginData) // http://localhost:8888/auth/login // assigning to JWT (in server)//returns the access token and the user data 
        
        if (!res.data?.accessToken) {
            console.log('access denide')
            console.log(res.data)     
        }
        else {

            console.log('access approved')
            console.log(res)
            
            sessionStorage['x-access-token'] = res.data.accessToken;
            setUser(res.data?.user)
            navigate('/')// Navigate to HomeWrapper
            
        }


    }


    return (
        <div className="Login">
            UserName: <input type="text" onChange={(el) => setUserName(el.target.value)}></input>
            Email: <input type="email" onChange={(el) => setEmail(el.target.value)}></input>
            <button onClick={() => {
                if (username && email)
                    handleLogin()
            }}>Log in</button>

        </div>

    )
}

export default Login;