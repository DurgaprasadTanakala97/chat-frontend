import { Users } from "lucide-react";
import "./SidebarSkeleton.css";

const SidebarSkeleton = () => {
  const skeletContacts = Array(8).fill(null);

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="header-content">
            <Users className="icon" />
            <span className="title">Contacts</span>
          </div>
        </div>

        {/* Skeleton contacts */}
        <div className="contacts">
          {skeletContacts.map((_, index) => {
            return (
              <div key={index} className="contact-item">
                {/* Avatar skeleton */}
                <div className="avatar-wrapper">
                  <div className="avatar"></div>
                </div>

                {/* Text skeleton */}
                <div className="text-wrapper">
                  <div className="text-line"></div>
                  <div className="text-line"></div>
                  <div className="text-line short"></div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default SidebarSkeleton;