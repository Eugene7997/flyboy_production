import { Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'
import {useDispatch, useSelector} from 'react-redux'

function UserRegistrationForm() {
    const [formData, setFormData] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const {loading, error} = useSelector((state)=> state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const validateFormBeforeSubmit = () => {
        if (!formData.username || formData.username.trim() === '') {
            dispatch(signInFailure("Username is required."))
            return false;
        }
        if (!formData.password || formData.password.trim() === '') {
            dispatch(signInFailure("Password is required."))
            return false;
        }
        return true;
    }
    const submitForm = async (e) => {
        e.preventDefault();
        if (!validateFormBeforeSubmit()) {
            return;
        }
        try {
            dispatch(signInStart())
            const res = await fetch("http://localhost:5000/api/users/sign_up", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                const errorData = await res.json();
                if (res.status === 409 || (errorData.message && errorData.message.includes('duplicate key error'))) {
                    throw new Error("Username is already taken.");
                } else {
                    throw new Error(errorData.message || "Something went wrong. Please try again.");
                }
            }
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            navigate('/sign_in')
        }
        catch (err) {
            dispatch(signInFailure(err.message))
        }
        
    }
    return (
        <div className="p-6">
            <h1 className="text-3xl text-center font-semibold my-7" >User Sign Up form</h1>
            <form className="flex flex-col gap-4 p-6" onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label className="text-xl  font-semibold text-gray-800 mb-2 block">Username</Form.Label>
                    <Form.Control className="border border-gray-300 p-2 w-1/4 rounded bg-slate-100" type="text" name="username" placeholder="Enter username" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-xl  font-semibold text-gray-800 mb-2 block">Password</Form.Label>
                    <Form.Control className="border border-gray-300 p-2 w-1/4 rounded bg-slate-100" type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" onChange={handleChange}/>
                    <IconButton
                        onClick={handleClickShowPassword}
                    >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </Form.Group>
                <button disabled={loading} type="submit" className="bg-slate-700 text-white p-3 w-1/4 rounded">{loading ? "Loading..." : 'Sign up'}</button>
            </form>
            <div className='flex gap-2 mt-5 p-6'>
                <p>Already have an account?</p>
                <Link to='/sign_in'>
                    <span className='text-blue-500'>Sign in</span>
                </Link>
            </div>
            <div>
                <p className='text-red-700'>{error}</p>
            </div>
        </div>
    )

}
export default UserRegistrationForm;