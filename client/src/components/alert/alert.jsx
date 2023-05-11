import "./alert.scss";

const Alert = ({ status, message }) => {
  return (
    <div className={`alert alert--${status}`}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
