import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';

import './Login.css'
import {currentUser} from '../../util/currentUser.js';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=>{
        if(currentUser){
            window.location.href= "/"
        }
    }, [])

    async function loginUser() {
        const response = await axios.post('/login', {

            email: email,
            password: password
        })

        console.log(response.data)
        if (response.data.success) {
            await swal({
                title: "Success",
                text: response.data.message,
                icon: "success",
                button: "Aww yiss!",
            });

            localStorage.setItem('currentUser', JSON.stringify(response.data.data));
            window.location.href='/'
        }

        else {
            await swal({
                title: "Error",
                text: response.data.message,
                icon: "error",
                button: "Try Again!",
              });
            setEmail('')
            setPassword('')
            localStorage.removeItem('currentUser');
        }
    }

    return (
        <div>
            <h1 className="text-center">Login</h1>
            <div className="row">
                <div className="col-md-6">

                </div>

                <div className="col-md-6">
                    <div className="form-container">
                        <form>
                            <div>
                                <label htmlFor="name">Email</label>
                                <input type='email' id='email'
                                    placeholder='Enter email' className="user-input"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>



                            <div>
                                <label htmlFor="name">Password</label>
                                <input type='password' id='name'
                                    placeholder='Enter password' className="user-input"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div>
                                <button type="button" className="login-button" onClick={loginUser}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login