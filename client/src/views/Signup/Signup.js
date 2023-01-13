import React from "react";
import './Signup.css';

function Signup() {
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
                                <label htmlFor="name">Name</label>
                                <input type='text' Classname='form-control' id='name'
                                 placeholder='Enter name'  className="user-input"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Email</label>
                                <input type='email' Classname='form-control' id='name'
                                 placeholder='Enter email'  className="user-input"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Phone</label>
                                <input type='text' Classname='form-control' id='name'
                                 placeholder='Enter phone number'  className="user-input"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Password</label>
                                <input type='password' Classname='form-control' id='name'
                                 placeholder='Enter password'  className="user-input"/>
                            </div>

                            <div>
                                <button type="submit" className="signup-button">Signup</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup;