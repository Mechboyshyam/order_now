import React, { useState } from "react";
import axios from "axios";
import './Login.css'

function Login() {

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")


    async function loginUser() {
        const response = await axios.post('/signup', {

            email: email,

            password: password,

        })

        console.log(response.data)
        if (response.data.success) {
            alert(response.data.message)
            window.location.href = '/login'
        }

        else {
            alert(response.data.message)

            setEmail('')

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
                                <label htmlFor="name">Email</label>
                                <input type='email' Classname='form-control' id='name'
                                    placeholder='Enter email' className="user-input"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>



                            <div className="form-group">
                                <label htmlFor="name">Password</label>
                                <input type='password' Classname='form-control' id='name'
                                    placeholder='Enter password' className="user-input"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div>
                                <button type="submit" className="signup-button" onClick={loginUser}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;