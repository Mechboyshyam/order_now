import React from 'react'
import axios from 'axios';
import swal from 'sweetalert';

import {currentUser} from '../../util/currentUser.js'
import './Mylist.css'
import Navbar from '../../components/Navbar/Navbar'

import {myFoodListItems} from '../../util/myList'

function MyList() {
  async function placeFoodOrder(){
    const response = await axios.post("/orderFoodItems", {
      userId: currentUser._id,
      tableNumber: localStorage.getItem("tableNumber") || 1,
      items: myFoodListItems
    })

    if(response.data.success){
     await swal(
        "Order placed", response.data.message, "success")
        localStorage.removeItem("list")
        window.location.href='/'

    }
  }
  return (
    <div>
      <Navbar/>
      <h1 className='text-center'>MyList</h1>
      {
        myFoodListItems.map((item, index)=>{
          return (
          <div>
            <h6>Name: {item.name}</h6>
            <h6>Quantity: {item.quantity}</h6>
            <h6>Price: {item.price}</h6>
            <hr/>
          </div>)
        })
      }
      <button className='btn btn-primary' onClick={placeFoodOrder}>Confirm Order</button>
    </div>
  )
}

export default MyList