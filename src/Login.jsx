import {  useState } from "react"
import axios from 'axios';
import * as constants from './constans'
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

        console.log(loginData)

        const res = await axios.post('http://localhost:8888/auth/login', loginData)
        console.log(res);
        if (!res.data?.accessToken) {
            console.log('access denide')
            console.log(res.data)
            
        }
        else {
       
            console.log('access approved')
            console.log(res)
            sessionStorage['x-access-token'] = res.data.accessToken;

       
            setUser(res.data?.user)
            navigate('/')
           
          
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