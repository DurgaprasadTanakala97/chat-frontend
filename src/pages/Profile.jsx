import { useDispatch, useSelector } from "react-redux";
import { Camera, Loader2, Mail, User } from "lucide-react";
import { useState } from "react";
import "./Profile.css";
import { updateProfile } from "../store/slices/authSlice";

const Profile = () => {
  const { authUser, isUpdateProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    avatar: null,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);
    setFormData({ ...formData, avatar: file });
  };

  const handleUpdateProfile = () => {
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    if (formData.avatar) data.append("avatar", formData.avatar);
    dispatch(updateProfile(data));
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Update your personal information</p>
        </div>

        <div className="profile-body">

          {/* Avatar */}
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img
                src={selectedImage || authUser?.avatar?.url || "/avatar-holder.avif"}
                alt="avatar"
                className="avatar-img"
              />
              <label className="upload-btn" title="Change photo">
                <Camera size={16} color="#fff" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdateProfile}
                  hidden
                />
              </label>
            </div>
            <p className="upload-text">
              {isUpdateProfile ? "Uploading…" : "Click the camera icon to change photo"}
            </p>
          </div>

          {/* Form */}
          <div className="profile-form">
            <div className="form-group">
              <label><User /> Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label><Mail /> Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <button
              className="update-btn"
              onClick={handleUpdateProfile}
              disabled={isUpdateProfile}
            >
              {isUpdateProfile ? (
                <><Loader2 size={18} className="spin" /> Updating…</>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

          {/* Account Info */}
          <div className="account-box">
            <h3>Account Information</h3>
            <div className="account-row">
              <span>Member Since</span>
              <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
            </div>
            <div className="account-row">
              <span>Status</span>
              <span className="active">● Active</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;