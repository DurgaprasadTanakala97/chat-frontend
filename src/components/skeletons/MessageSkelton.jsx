import "./MessageSkeleton.css";

const MessageSkeleton = () => {
  const skeletons = Array(6).fill(null);

  return (
    <div className="skeleton-container">
      {skeletons.map((_, index) => {
        const isSender = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`skeleton-row ${isSender ? "sender" : "receiver"}`}
          >
            {/* Avatar */}
            <div className="skeleton-avatar"></div>

            {/* Message */}
            <div className="skeleton-bubble">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line long"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;