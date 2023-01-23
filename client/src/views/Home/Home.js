import React , {useEffect, useState} from 'react';
import axios from 'axios'

import './home.css'
import FoodItemCard from './../../components/FoodItemCard/FoodItemCard'
import Navbar from './../../components/Navbar/Navbar'

import {currentUser} from '../../util/currentUser.js';
import {loginRequired} from './../../util/loginRequired'

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
        const response = await axios.get(`/foodItems?title=${searchText}`)
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
        <h2>{currentUser?.name}</h2>

        <div className='search-container'>
            <input type="text" placeholder='search' className='input-search'
            value={searchText} onChange={(e)=> setsearchText(e.target.value)} />
        </div>

        <div className='food-items-result'>
        <div class="row">
        {
         currentFoodItems?.map((foodItem, index)=>{
           return (<FoodItemCard description={foodItem.description} category={foodItem.category} title={foodItem.title} price={foodItem.price} imgUrl={foodItem.imgUrl}  key={index}/>)
         })
        }
        </div>
      </div>


        <button type='button' className='btn btn-primary' onClick={logout}>Logout</button>
        </div>
    )
}

export default Home