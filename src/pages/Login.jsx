import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Mail, MessageSquare, Lock, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";
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
    <div className="auth-page">
      {/* Left – form */}
      <div className="auth-left">
        <div className="auth-card">

          <div className="auth-header">
            <div className="auth-logo-box">
              <MessageSquare className="auth-logo-icon" />
            </div>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to continue your conversations</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoggingIn} className="auth-btn">
              {isLoggingIn ? (
                <><Loader2 size={18} className="animate-spin" /> Signing in…</>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>

        </div>
      </div>

      {/* Right – decorative */}
      <div className="auth-right">
        <div className="auth-grid-dots" />
        <div className="auth-right-content">
          <div className="auth-right-icon">
            <MessageSquare />
          </div>
          <h2 className="auth-right-title">Quick-chat</h2>
          <p className="auth-right-sub">
            Connect instantly with friends and colleagues. Fast, secure, real-time messaging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;