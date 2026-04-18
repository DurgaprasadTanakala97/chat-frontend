import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSelectedUser } from "../store/slices/chatSlice";
import { getUser } from "../store/slices/authSlice"
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const { users, selectedUser, isUsersLoading, onlineUsers } =
    useSelector((state) => state.chat);
  
  const {user } = useSelector((state)=>state?.auth)

  useEffect(()=>{
  },[users])
const [userId, setUserId] = useState(null);

const [name ,setname] =useState(false)
 
  const dispatchs = useDispatch();


 useEffect(()=>{
  dispatchs(getUser()).then((res)=>{

    const userid = res.payload._id ;
    const name = res.payload.fullName
    setUserId(userid)
    setname(name)
  })
 },[user])



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers()).then(()=>{
    });
  }, [dispatch]);

  

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers?.includes(user._id))
    : users;
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-top">
          <Users className="icon" />
          <span className="title">Contacts</span>
        </div>

        {/* Filter */}
        <div className="filter">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            Show only online
          </label>
          <span className="online-count">
           ({filteredUsers?.length || 0} online)
          </span>
        </div>
           <div className="currentUser"> 
          <span>{name}</span>
           <span className="userid">{onlineUsers?.includes(user._id) ? "offline" : "online"}</span>        
          </div>
      </div>
      {/* Users List */}
      <div className="user-list">
     {filteredUsers?.length > 0 ? (
      filteredUsers.map((user) => {  
      return (
      <button
        key={user._id}
        onClick={() => dispatch(setSelectedUser(user))}
        className={`user-item ${
          selectedUser?._id === user._id ? "active" : ""
        }`}
      >
        {/* Avatar */}
        <div className="avatar-wrapper">
          <img
            src={user?.avatar?.url || "/avatar-holder.avif"}            
            className="avatar"
          />
        </div>
        {/* User Info */}
        <div className="user-info">
          <div className="name">{user.fullName}</div>       
          <div className="status">
            {userId? "online " :" offline"}
          </div>
        </div>
      </button>
    );
  })
) : (
  <div className="no-users">No Users Found</div>
)}
      </div>
    </aside>
  );
};

export default Sidebar;