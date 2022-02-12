import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AuthRoute from './auth/routes/AuthRoute';
import DefaultRoute from './auth/routes/DefaultRoute';
import Home from './core/Home';
import Login from './core/Login';
import Search from './core/Search';
import Signup from './core/Signup';
import UserAddCard from './user/UserAddCard';
import UserCreatedCards from './user/UserCreatedCards';
import UserSavedCards from './user/UserSavedCards';
import UserHome from './user/UserHome';
import UserEditCard from './user/UserEditCard';


const App = () => {
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<DefaultRoute><Home/></DefaultRoute>} />
    <Route path="/login" element={<DefaultRoute><Login/></DefaultRoute>} />
    <Route path="/signup" element={<DefaultRoute><Signup/></DefaultRoute>} />
    <Route path="/search" element={<Search/>} />
    <Route path="/user" element={<AuthRoute><UserHome/></AuthRoute>} />
    <Route path="/user/saved" element={<AuthRoute><UserSavedCards/></AuthRoute>} />
    <Route path="/user/card/create" element={<AuthRoute><UserAddCard/></AuthRoute>} />
    <Route path="/user/cards" element={<AuthRoute><UserCreatedCards/></AuthRoute>} />
    <Route path="/user/card/update/:cardId" element={<AuthRoute><UserEditCard/></AuthRoute>} />
    </Routes>
    </BrowserRouter> 
  );
}

export default App;
