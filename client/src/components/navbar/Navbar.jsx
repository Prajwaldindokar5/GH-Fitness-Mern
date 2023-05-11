import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import NewRequest from "../../utils/newRequest";
import { userLogout } from "../../state/slice";
import Alert from "../alert/alert";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await NewRequest.post("user/logout");
      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
          dispatch(userLogout());
        }, 1500);
      }
    } catch (error) {
      // console.log(error);
      setSuccess(false);
      setError(error.response.data);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div to="/" className="logo">
          <Link to="/" className="link">
            <span className="first">GH</span>
            <span className="second">Fitness</span>
          </Link>
        </div>
        <div className="navLinks">
          {user ? (
            <>
              <Link to="profile" className="nav-profile link">
                <span>{user.name}</span>
                <img src={user.photo} alt="" />
              </Link>
              <span
                onClick={handleLogout}
                className="material-symbols-outlined logout-icon"
              >
                logout
              </span>
            </>
          ) : (
            <>
              <Link className="link" to="/signup">
                Signup
              </Link>
              <Link className="link" to="login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      {isSuccess && <Alert status={"success"} message={"Logout Successfull"} />}
      {error && <Alert status={"error"} message={error} />}
    </div>
  );
};

export default Navbar;
