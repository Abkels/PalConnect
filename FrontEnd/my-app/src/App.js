import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { useSelector } from 'react-redux'
// import {CallIcon} from './svg'


const App = () => {
  // const {user} = useSelector((state)=>({...state}))
  // console.log(user)
  // const {user} = useSelector((state) => state.user);
  // const {token} = user;
  return (
    <div className='dark'>
      <home />
      <login />
      <register />
      <Router>
        <Routes>
          <Route exact path='/' element = {<Home />} />
          <Route exact path='/login' element = {<Login />} />
          <Route exact path='/register' element = {<Register />} />      
        </Routes>
      </Router>
    </div>

    // <div className="dark">
    //     <Router>
    //       <Routes>
    //         <Route exact path="/" element={token ? <Home /> : <Navigate to="/login" />}/>
    //         <Route exact path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
    //         <Route exact path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
    //       </Routes>
    //     </Router>
    // </div>    
  )
}

export default App


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// //Pages
// import Home from "./pages/home";
// import Login from "./pages/login";
// import Register from "./pages/register";


// function App() {
//   //const [connected, setConnected] = useState(false);
//   // const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);
//   const { token } = user;

//   return (
//     <div className="dark">
      
//         <Router>
//           <Routes>
//             <Route
//               exact
//               path="/"
//               element={
//                 token ? <Home /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               exact
//               path="/login"
//               element={!token ? <Login /> : <Navigate to="/" />}
//             />
//             <Route
//               exact
//               path="/register"
//               element={!token ? <Register /> : <Navigate to="/" />}
//             />
//           </Routes>
//         </Router>
      
//     </div>
//   );
// }

// export default App;
