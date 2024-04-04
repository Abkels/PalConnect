import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux'
//pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
//socket io
import { io } from 'socket.io-client'
import SocketContext from './context/SocketContext'
const socket = io (process.env.REACT_APP_API_ENDPOINT.split("/api/vi")[0]);
const App = () => {
  // const {user} = useSelector((state)=>({...state}))
  // console.log(user)
  // const {user} = useSelector((state) => state.user);
  // const {token} = user;
  return ( 
    <div className='dark'>
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route exact path='/' element = {<Home socket= {socket}/>} />
            <Route exact path='/login' element = {<Login />} />
            <Route exact path='/register' element = {<Register />} /> 
          </Routes>
        </Router>
      </SocketContext.Provider>
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
