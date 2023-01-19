import React , {useEffect, useState} from 'react';
import {currentUser} from '../../util/currentUser.js';

function Home(){


    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href= '/login'
    }

    if(!currentUser){
        window.location.href = '/login'
    }

    return(<div>
        <div className='text-center'>Home</div>
        <h2>{currentUser?.name}</h2>


        <button type='button' className='btn btn-primary' onClick={logout}>Logout</button>
        </div>
    )
}

export default Home;