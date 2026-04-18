import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react';
import { getUser, setOnlineUsers } from './store/slices/authSlice'
import { connectSocket, disconnectSocket } from './lib/socket';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navabar from './components/Navabar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify'

function App() {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser) {
      dispatch(getUser());
    }
  }, [authUser]);

  useEffect(() => {
    if (!authUser || !authUser._id) {
      disconnectSocket();
      return;
    }
    const socket = connectSocket(authUser._id);
    if (!socket) return;

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on("connect_error", (err) => {
      console.error("Socket Connection Error:", err.message);
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("connect_error");
      disconnectSocket();
    };
  }, [authUser, dispatch]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="loader-screen">
        <div className="loader-ring" />
        <span className="loader-label">Loading Quick-chat…</span>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-shell">
        <Navabar />

        {/* page-fill ensures every route fills the remaining height */}
        <div className="page-fill">
          <Routes>
            <Route path='/'         element={authUser  ? <Home />     : <Navigate to="/login" />} />
            <Route path='/register' element={!authUser ? <Register /> : <Navigate to="/" />} />
            <Route path='/login'    element={!authUser ? <Login />    : <Navigate to="/" />} />
            <Route path='/profile'  element={authUser  ? <Profile />  : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: 'var(--bg-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
        }}
      />
    </Router>
  )
}

export default App;