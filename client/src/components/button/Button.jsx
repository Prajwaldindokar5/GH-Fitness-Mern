import "./Button.scss";

const Button = ({ button, nameclass }) => {
  return <button className={`btn ${nameclass}`}>{button}</button>;
};

export default Button;
