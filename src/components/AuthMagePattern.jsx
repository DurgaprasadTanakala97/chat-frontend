import "./AuthMagePattern.css"

const AuthMagePattern = ({ title, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        
        {/* Grid pattern */}
        <div className="grid-pattern">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`grid-item ${i % 2 === 0 ? "pulse" : ""}`}
            ></div>
          ))}
        </div>

        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthMagePattern;