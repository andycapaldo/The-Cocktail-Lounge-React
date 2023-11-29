import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './views/LandingPage';
import Login from "./views/Login";
import AlertMessage from "./components/AlertMessage";
import SignUp from "./views/SignUp";
import CocktailsView from "./views/CocktailsView";
import EditCocktail from "./views/EditCocktail";
import UserCocktail from "./views/UserCocktailView";


import UserType from "./types/auth";
import CategoryType from "./types/category";
import Home from "./views/Home";

import { getMe } from './lib/apiWrapper'
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null)
  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);

  useEffect( () => {
    async function getLoggedInUser(){
      if (isLoggedIn){
        const token = localStorage.getItem('token') as string
        const response = await getMe(token);
        if (response.data){
          setLoggedInUser(response.data)
        } else {
          console.error(response.error)
        }
      }
    }

    getLoggedInUser();
  }, [isLoggedIn])


  const logUserIn = (user:UserType):void => {
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
          <Route path='/login' element={<Login logUserIn={logUserIn} isLoggedIn={isLoggedIn} flashMessage={flashMessage} />} />
          <Route path='/signup' element={<SignUp logUserIn={logUserIn} flashMessage={flashMessage} />} />
          <Route path='/home' element={<Home loggedInUser={loggedInUser} />} />
          <Route path='/cocktails' element={<CocktailsView isLoggedIn={isLoggedIn} flashMessage={flashMessage} currentUser={loggedInUser} />} />
          <Route path='/editcocktail/:cocktailId' element={<EditCocktail currentUser={loggedInUser} flashMessage={flashMessage} />} />
          <Route path='usercocktail/:cocktailId' element={<UserCocktail currentUser={loggedInUser} flashMessage={flashMessage} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
