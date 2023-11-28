import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './views/LandingPage';
import Login from "./views/Login";
import AlertMessage from "./components/AlertMessage";
import SignUp from "./views/SignUp";


import UserType from "./types/auth";
import CategoryType from "./types/category";
import Home from "./views/Home";

import { getMe } from './lib/apiWrapper'
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)
  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);


  const logUserIn = (user:Partial<UserType>):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    flashMessage(`${user.username} has been logged in`, 'success');
  }

  const logUserOut = ():void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem('token');
    flashMessage('You have logged out', 'info');
  }

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
    setMessage(newMessage);
    setCategory(newCategory);
}

  return (
    <BrowserRouter>
      <Container>
        {isLoggedIn && <Header isLoggedIn={isLoggedIn} handleLogOut={logUserOut}></Header>}
        {message && category && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login logUserIn={logUserIn} isLoggedIn={isLoggedIn} />} />
          <Route path='/signup' element={<SignUp logUserIn={logUserIn} />} />
          <Route path='/home' element={<Home loggedInUser={loggedInUser} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
