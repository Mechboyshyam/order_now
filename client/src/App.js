import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './views/Home/Home.js';
import Signup from './views/Signup/Signup.js';
import Login from './views/Login/Login.js';
import BookTable from "./views/BookTable/BookTable.js";
import MyOrders from "./views/MyOrders/MyOrders.js";
import MyList from './views/MyList/Mylist.js'


function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/login" element={< Login />} />
          <Route path="/signup" element={< Signup />} />
          <Route path="/booktable" element={< BookTable />} />
          <Route path="/mylist" element={< MyList />} />
          <Route path="/myorders" element={< MyOrders />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;