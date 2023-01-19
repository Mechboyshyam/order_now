import React , {useEffect, useState} from 'react';
import {currentUser} from '../../util/currentUser.js';

function Home(){

    return(<div>
        <div className='text-center'>Home</div>
        <h2>{currentUser?.name}</h2>
        </div>
    )
}

export default Home;