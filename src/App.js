import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";

function App(){
  return(
    <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={< Login/>}/>
              <Route path="/Signup" element={<Signup />}/>
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
    </div>
  )
}
export default App;