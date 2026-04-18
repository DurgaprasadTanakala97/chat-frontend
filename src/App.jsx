import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import { getUser } from './store/slices/authSlice'
import { connectSocket, disconnectSocket } from './lib/socket';
import {BrowserRouter as Router, Routes,Route, Navigate} from "react-router-dom"
import Navabar from './components/Navabar';
import Home  from './pages/Home';
import  Login from './pages/Login';
import Register  from './pages/Register';
import Profile  from './pages/Profile';
import { ToastContainer} from 'react-toastify'
function App() {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

useEffect(() => {
  if (!authUser) {
    dispatch(getUser());
  }
}, [authUser]);

  // useEffect(() => {
  //   if (authUser) {
  //     const socket = connectSocket(authUser._id);

  //     socket.on("connect_error", (err) => {
  //       console.error("Socket Connection Error:", err.message);
  //     });

  //     return () => {
  //       disconnectSocket();
  //     };
  //   } else {
  //     disconnectSocket();
  //   }
  // }, [authUser]);

  useEffect(() => {
  // ✅ Stop if user not ready
  if (!authUser || !authUser._id) {
    disconnectSocket();
    return;
  }

  const socket = connectSocket(authUser._id);

  // ❌ CRITICAL FIX → don't use socket if null
  if (!socket) return;

  socket.on("connect_error", (err) => {
    console.error("Socket Connection Error:", err.message);
  });

  return () => {
    socket.off("connect_error"); // cleanup
    disconnectSocket();
  };
}, [authUser]);
if(isCheckingAuth && !authUser){
  return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )
}
  return (
    <>
     <Router>
      <Navabar/>
   <Routes>
  <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
  <Route path='/register' element={!authUser ? <Register /> : <Navigate to="/" />} />
  <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
  <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
</Routes>
     <ToastContainer/>
     </Router>
    </>
  )
}

export default App;