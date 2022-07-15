import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Components/Routes/LogIn/LogIn';
import SignUp from './Components/Routes/SignUp/SignUp';
import Post from './Components/Post/Post';
import './App.css';

function App() {



  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/login' element={<LogIn />} />
          <Route exact path='/post' element={<Post />} />
        </Routes>
      </Router>
    </>


  );


}

export default App;
