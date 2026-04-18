import { Mail, MessageSquare, Lock, Loader2, User, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { signup } from "../store/slices/authSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const navigate = useNavigate();
  const { isSigningUp } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData)).then(() => navigate("/login"));
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
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Join Quick-chat and start messaging</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="input-group">
              <label htmlFor="reg-name">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  id="reg-name"
                  type="text"
                  className="input-field"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  id="reg-email"
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
              <label htmlFor="reg-password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  id="reg-password"
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
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSigningUp} className="auth-btn">
              {isSigningUp ? (
                <><Loader2 size={18} className="animate-spin" /> Creating account…</>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
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
          <h2 className="auth-right-title">Join the community</h2>
          <p className="auth-right-sub">
            Connect with friends and family. Share moments and stay in touch, all in real time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;