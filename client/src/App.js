import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import Home from './Components/Home';
import UserProfile from './Components/Profile/UserProfile'
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Components/Routes/LogIn/LogIn';
import ShopQuery from './Components/Routes/Shop/ShopQuery'
import Shop from './Components/Routes/Shop/Shop'
import Product from './Components/Routes/Product/Product';
import SignUp from './Components/Routes/SignUp/SignUp';
import Post from './Components/Post/Post';
import './App.css';




function App() {



  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/login' element={<LogIn />} />
          <Route exact path='/post' element={<Post />} />
          <Route exact path='/product/:id' element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:search" element={<ShopQuery />} />
        </Routes>
      </Router>
    </>


  );


}

export default App;
