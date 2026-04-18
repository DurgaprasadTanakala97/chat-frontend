import { LogOut, MessageSquare, User } from 'lucide-react';
import {  useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Navabar.css";
import {logout} from '../store/slices/authSlice'
const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">

          {/* Left logo */}
          <div className="navbar-left">
            <Link to="/" className="logo-link">
              <div className="logo-icon">
                <MessageSquare className="icon" />
              </div>
              <h1 className="logo-text">Quick-chat</h1>
            </Link>
          </div>

          {/* Right side */}
         <div className="nav-right">
  {authUser && (
    <>
      <Link to="/profile" className="nav-link">
        <User className="nav-icon" />
        <span className="nav-text">Profile</span>
      </Link>

      <button onClick={handleLogout} className="nav-btn logout-btn">
        <LogOut className="nav-icon" />
        <span className="nav-text" >Logout</span>
      </button>
    </>
  )}
         </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;