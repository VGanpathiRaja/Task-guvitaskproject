import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";

function App(){
  return(
    <div>
          <HashRouter>
            <Routes>
              <Route path="/" element={< Login/>}/>
              <Route path="/Signup" element={<Signup />}/>
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </HashRouter>
    </div>
  )
}
export default App;