import React from 'react'
import './MyList.css'
import Navbar from '../../components/Navbar/Navbar'

import {myFoodListItems} from '../../util/myList'

function MyList() {
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
      <button className='btn btn-primary'>Confirm Order</button>
    </div>
  )
}

export default MyList