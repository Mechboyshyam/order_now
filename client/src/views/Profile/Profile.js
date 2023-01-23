import React, {useEffect} from 'react'
import {loginRequired} from './../../util/loginRequired'

import "./Profile.css"

function Profile() {

  useEffect(() => {
    loginRequired()
  }, [])

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile