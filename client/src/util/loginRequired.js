import swal from 'sweetalert'

import { currentUser } from './currentUser'

export async function loginRequired() {
  console.log(currentUser)
  
  if (!currentUser) {
    await swal({
      title: "Login Required",
      text: "Please login to continue",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    window.location.href = '/login'
  }
}