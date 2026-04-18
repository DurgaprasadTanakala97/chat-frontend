import "./MessageSkeleton.css";

const MessageSkeleton = () => {
  const skeletons = Array(6).fill(null);

  return (
    <div className="skeleton-container">
      {skeletons.map((_, index) => {
        const isSender = index % 2 !== 0;
        return (
          <div key={index} className={`skeleton-row ${isSender ? "sender" : "receiver"}`}>
            <div className="skeleton-avatar sk" />
            <div className="skeleton-bubble">
              <div className="skeleton-line short sk" />
              <div className="skeleton-line long sk" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;