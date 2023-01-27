import React,{useEffect} from 'react'

import { loginRequired } from './../../util/loginRequired'

import "./MyOrders.css"
import Navbar from '../../components/Navbar/Navbar'

function MyOrders(){

  useEffect(() => {
    loginRequired()
  }, [])

  return (
    <div>
      <Navbar/>
      <div>
        <h3>Your orders---</h3>
      </div>
    </div>
  )
}

export default MyOrders