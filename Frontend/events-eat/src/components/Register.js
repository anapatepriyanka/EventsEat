import './Register.css';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import validator from 'validator'
export default function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    // const[serverErrors, setServerErrors] = useState(null)
    const[clientErrors, setClientErrors] = useState({})
const runValidations = () => {
    const errors ={}
    if(username.trim().length == 0) {
        errors.username = 'username is required'
    }
    if(email.trim().length == 0) {
        errors.email = 'email is required'
    } else if(!validator.isEmail(email)) {
        errors.email = 'invalid email format'
    }

    if(password.trim().length == 0) {
        errors.password = 'password is required'
    } else if(password.trim().length < 8 || password.trim().length > 128) {
        errors.password = 'password should be between 8 - 128 characters'
    }

    if(role.trim().length == 0) {
        errors.role = 'role is required'
    }
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
}

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = runValidations();

        if (isValid) {
            const formdata = {
                username,
                email,
                password,
                role
            }
            console.log("form",formdata)
            setUsername("")
            setEmail("")
            setPassword("")
            setRole("")
            navigate("/success")
        }
    }



    return ( 
        <div className='register-container'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className='register-form'>
                <label htmlFor='username'>Enter Username</label><br/>
                <input type='text' value={username} onChange={e=>setUsername(e.target.value)}
                id='username'
                />
                 {clientErrors.username && <span className='error'>{clientErrors.username}</span>}
                <br/>
                <label htmlFor='email'>Enter email</label>
                <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}}
                id='email'
                />
                {clientErrors.email && <span className='error'>{clientErrors.email}</span>}
                <br/>
                <label htmlFor='password'>Enter password</label>
                <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}}
                id='password'
                />
                {clientErrors.password && <span className='error'>{clientErrors.password}</span>}
                <br/>
                <label>select Role</label><br/>
                <input type='radio' value='admin' onChange={(e)=>{setRole(e.target.value)}}
                checked={role==='admin'}
                id='admin'
                name="role"
                />
                <label htmlFor='admin'>Admin</label>
                <br/>
                <input type='radio' value='caterer' onChange={(e)=>{setRole(e.target.value)}}
                checked={role==='caterer'}
                id='caterer'
                name="role"
                />
                <label htmlFor='caterer'>Caterer</label>
                <br/>
                <input type='radio' value='customer' onChange={(e)=>{setRole(e.target.value)}}
                checked={role==='customer'}
                id='customer'
                name="role"
                />
                <label htmlFor='customer'>customer</label>
                <br/>
                {clientErrors.role && <span className='error'>{clientErrors.role}</span>}
                <input type='submit' className='submit-button'/>

            </form>
        </div>
    )
}


    
 