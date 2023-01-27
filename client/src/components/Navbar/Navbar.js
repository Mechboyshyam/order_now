import React, {useState} from 'react'
import "./Navbar.css"
import { myFoodListCount } from '../../util/myList'
import { Link } from 'react-router-dom'

import {Myorders} from './../../views/MyOrders/MyOrders'

function Navbar({ user }) {
  const [foodItemCount, setFoodItemCount] = useState(myFoodListCount)
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success ">
        <div class="container-fluid">
          <a class="navbar-brand logo-order text-dark" href="#"><b>Order_Now</b></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                
              </li>
            </ul>
            <form class="d-flex align-items-center">
            <h4 className='me-2 text-light text-decoration- username'>Hello {user}</h4>
            <a class="nav-link active text-light me-2 " aria-current="page" href="/"><h4>Home</h4></a>
            <Link to="/myList" className='text-decoration-none'>
                <h4 className='me-2 my-list'>Cart {foodItemCount}</h4>
              </Link>

              <Link to="/myorders" className='text-decoration-none'>
            <h4 className='me-2 my-list'>My Order</h4>
            </Link>
              
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar