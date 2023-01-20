import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import './Signup.css'
import {currentUser} from '../../util/currentUser.js';

function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")

    useEffect(()=>{
        if(currentUser){
            window.location.href='/'
        }
    })

    async function signupUser() {
        const response = await axios.post('/signup', {
            name: name,
            email: email,
            phone: phone,
            password: password,
            role: role
        })

        console.log(response.data)
        if (response.data.success) {
            alert(response.data.message)
            window.location.href = '/login'
        }

        else {
            alert(response.data.message)
            setName('')
            setEmail('')
            setPhone('')
            setPassword('')

        }
    }

return (
    <div>
        <h1 className="text-center">Signup</h1>
        <div className="row">
            <div className="col-md-6">

            </div>

            <div className="col-md-6">
                <div className="form-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type='text' Classname='form-control' id='name'
                                placeholder='Enter name' className="user-input"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <input type='email' Classname='form-control' id='name'
                                placeholder='Enter email' className="user-input"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Phone</label>
                            <input type='text' Classname='form-control' id='name'
                                placeholder='Enter phone number' className="user-input"
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Password</label>
                            <input type='password' Classname='form-control' id='name'
                                placeholder='Enter password' className="user-input"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div>
                            <button type="submit" className="signup-button" onClick={signupUser}>Signup</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
)
}

export default Signup;