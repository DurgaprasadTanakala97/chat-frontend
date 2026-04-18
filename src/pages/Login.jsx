import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, MessageSquare,  LockIcon,  Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";
import AuthMagePattern from "../components/AuthMagePattern";
import { login } from "../store/slices/authSlice";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { isLoggingIn } = useSelector(state => state.auth); 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

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

            <button type="submit" disabled={isLoggingIn} className="login-btn">
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin" /> Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          <div className="login-footer">
            <p>
              Don’t have account? <Link to="/register">Create account</Link>
            </p>
          </div>

        </div>
      </div>

      <AuthMagePattern
        title="Welcome Back!"
        subtitle="Sign in to continue your conversation"
      />
    </div>
  );
};

export default Login;