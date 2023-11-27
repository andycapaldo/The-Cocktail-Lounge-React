import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import Login from "./views/Login/Login";
import AlertMessage from "./components/AlertMessage";
import SignUp from "./views/SignUp/SignUp";

import UserType from "./types/auth";
import CategoryType from "./types/category";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)
  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);

  const logUserIn = (user:Partial<UserType>):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
}

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/landingpage' element={<LandingPage/>}/>
      <Route path='/login' element={<Login logUserIn={logUserIn} />} />
      <Route path='/signup' element={<SignUp logUserIn={logUserIn} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
