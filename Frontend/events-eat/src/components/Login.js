import './Login.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import validator from 'validator'
export default function Login() {
    const navigate = useNavigate();
    const[form, setForm] = useState({
        email: '',
        password: '',
        clientErrors:{}
    })
    const runValidations = () => {
        const errors = {};
        if (form.email.trim().length == 0) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(form.email)) {
            errors.email = 'Invalid email format';
        }

        if (form.password.trim().length == 0) {
            errors.password = 'Password is required';
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'Password should be between 8 - 128 characters';
        }
        setForm({ ...form, clientErrors: errors });

        return Object.keys(errors).length === 0;
    };

    
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const isValid = runValidations();

        if (isValid) {
            const formData = _.pick(form, ['email', 'password']);
            console.log(formData);
            navigate("/success")
        }

    }
    const handleChange = (e) => {
        const {value, name} = e.target
        setForm({...form, [name]:value})
    }
    return ( 
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className='login-container'>
                <label htmlFor='email' className='login-form'>Enter email</label>
                <input type='text' value={form.email} onChange={handleChange} name='email' id='email'/>
                {form.clientErrors.email && <span className='error'>{form.clientErrors.email}</span>}
                <br/>
                <label htmlFor='password' className='login-form'>Enter password</label>
                <input type='text' value={form.password} onChange={handleChange} name='password' id='password'/>
                {form.clientErrors.password && <span className='error'>{form.clientErrors.password}</span>}
                <br/>
                <input type='submit' value='login'/>
            </form>
            <Link to="/register" className='link-create-account'>Create an account</Link>
        </div>
    )
}