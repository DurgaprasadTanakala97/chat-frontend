import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSelectedUser } from "../store/slices/chatSlice";
import { getUser } from "../store/slices/authSlice";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");

  const { users, selectedUser, isUsersLoading } =
    useSelector((state) => state.chat);
  const { authUser, onlineUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      if (res?.payload?.fullName) {
        setCurrentUserName(res.payload.fullName);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers?.includes(user._id))
    : users;

  const onlineCount = users?.filter((u) => onlineUsers?.includes(u._id)).length || 0;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-top">
          <Users className="icon" />
          <span className="title">Chats</span>
        </div>

        {/* Filter */}
        <div className="filter">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            Online only
          </label>
          <span className="online-count">{onlineCount} online</span>
        </div>

        {/* Current user */}
        {currentUserName && (
          <div className="currentUser">
            <span>{currentUserName}</span>
            <span className="userid">
              {onlineUsers?.includes(authUser?._id) ? "Online" : "Offline"}
            </span>
          </div>
        )}
      </div>

      {/* Users List */}
      <div className="user-list">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers?.includes(user._id);
            return (
              <button
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`user-item ${selectedUser?._id === user._id ? "active" : ""}`}
              >
                {/* Avatar */}
                <div className={`avatar-wrapper ${isOnline ? "is-online" : ""}`}>
                  <img
                    src={user?.avatar?.url || "/avatar-holder.avif"}
                    alt={user.fullName}
                    className="avatar"
                  />
                </div>

                {/* User Info */}
                <div className="user-info">
                  <div className="name">{user.fullName}</div>
                  <div className={`status ${isOnline ? "online" : ""}`}>
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="no-users">
            {showOnlineOnly ? "No users online right now" : "No users found"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;