import { Link } from "react-router-dom";
import "./Profile.scss";
import Button from "../../components/button/Button";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="profile">
      <img src={user.photo} alt="" className="profileImage" />
      <div className="profile-info">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      <Link to="/updateProfile" className="link">
        <Button button="Update Profile" />
      </Link>
    </div>
  );
};

export default Profile;
