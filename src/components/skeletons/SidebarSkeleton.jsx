import { Users } from "lucide-react";
import "./SidebarSkeleton.css";

const SidebarSkeleton = () => {
  const items = Array(8).fill(null);

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="skeleton-header">
          <div className="skeleton-header-icon shimmer" />
          <div className="skeleton-title shimmer" />
        </div>
      </div>

      {/* Skeleton contacts */}
      <div className="contacts">
        {items.map((_, i) => (
          <div key={i} className="contact-item">
            <div className="avatar shimmer" />
            <div className="text-wrapper">
              <div className="text-line shimmer" />
              <div className="text-line short shimmer" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;