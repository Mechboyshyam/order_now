import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/signup" element={<h1>SignUp</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;