import React , {useEffect, useState} from 'react';
import axios from 'axios'

import Navbar from './../../components/Navbar/Navbar.js'
import './home.css'
import FoodItemCard from './../../components/FoodItemCard/FoodItemCard'

import {currentUser} from '../../util/currentUser.js';
import {loginRequired} from './../../util/loginRequired'

function Home(){

    const [searchText, setSearchText] = useState("");
    const [currentFoodItems, setAllFoodItems] = useState([])

    async function fetchAllItems(){
        console.log('fetching all items')
        const response = await axios.get('/allFoodItems')
        console.log(response.data.data)
        setAllFoodItems(response.data.data)
    }

    async function fetchSpecificItems(){
        console.log('fetching specific items')
        const response = await axios.get(`/foodItems?title=${searchText}`)
        console.log(response.data.data)
        setAllFoodItems(response.data.data)
    }

    useEffect(()=>{
        if(searchText.length > 0){
            fetchSpecificItems()
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
        <Navbar user={currentUser?.name} />

        <div className='search-container'>
            <input type="text" placeholder='Search' className='input-search'
            value={searchText} onChange={(e)=> setSearchText(e.target.value)} />
        </div>

        <div className='food-items-result'>
           <div className='row'>
           {
                currentFoodItems?.map((foodItem, index)=>{
                   return  (<FoodItemCard description={foodItem.description}
                     category={foodItem.category} title={foodItem.title}
                      price={foodItem.price} imgUrl={foodItem.imgUrl} 
                       key={index}/>)
                })
            }
           </div>
        </div>


        <button type='button' className='btn btn-primary' onClick={logout}>Logout</button>
        </div>
    )
}

export default Home