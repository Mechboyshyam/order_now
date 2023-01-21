import React , {useEffect, useState} from 'react';
import axios from 'axios'

import './home.css'
import {currentUser} from '../../util/currentUser.js';

function Home(){

    const {searchText, setsearchText} = useState("");
    const {currentFoodItems, setAllFoodItems} = useState([])

    async function fetchAllItems(){
        console.log('fetching all items')
        const response = await axios.get('/allFoodItem')
        console.log(response.data.data)
        setAllFoodItems(response.data.data)
    }

    async function fetchSpecificItem(){
        console.log('fetching specific items')
        const response = await axios.get(`/allFoodItems?title=${searchText}`)
        console.log(response.data.data)
        setAllFoodItems(response.data.data)
    }

    useEffect(()=>{
        if(searchText.length > 0){
            fetchSpecificItem()
        }
        else{
            fetchAllItems()
        }
    },[searchText])

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href= '/login'
    }

    useEffect(()=>{
        loginRequired()
    } , [])

    return(<div>
        <div className='text-center'>Home</div>
        <h2>{currentUser?.name}</h2>

        <div className='search-container'>
            <input type="text" placeholder='search' className='input-search'
            value={searchText} onChange={(e)=> setsearchText(e.target.value)} />
        </div>


        <button type='button' className='btn btn-primary' onClick={logout}>Logout</button>
        </div>
    )
}

export default Home;