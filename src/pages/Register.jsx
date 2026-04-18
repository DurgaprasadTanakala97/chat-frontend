import { Mail, MessageSquare,  LockIcon,  Loader2, User } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import "./Register.css"
import AuthMagePattern from "../components/AuthMagePattern";

import { signup } from "../store/slices/authSlice";

const Register = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [formData ,setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  });
 const navigate =  useNavigate()
 const { isSigningUp } = useSelector(state => state.auth); 
  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(signup(formData))
        navigate("/login");
  }
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-card">

          <div className="login-header">
            <div className="logo-box">
              <MessageSquare className="logo-icon" />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">

             <div className="input-group">
              <label>fullName</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  placeholder="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  className="input-field"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <LockIcon className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="******"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSigningUp} className="login-btn">
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin" /> Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          <div className="login-footer">
            <p>
             Already have an account <Link to="/login">Sign In</Link>
            </p>
          </div>

        </div>
      </div>

      <AuthMagePattern
        title="Join our community!"
        subtitle="Connect with friends and family,share your
        thoughts and stay touch with your loves one.
        "
      />
    </div>
  )
}

export default Register