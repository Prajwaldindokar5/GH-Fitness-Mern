import "./UpdateProfile.scss";
import FormInput from "../../components/formInputes/formInputes";
import Button from "../../components/button/Button";
import { useState } from "react";
import upload from "../../utils/upload";
import NewRequest from "../../utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../state/slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "../../components/alert/alert";

const defaultProfileFields = { name: "", email: "", photo: "" };
const defaultPasswordFields = {
  currentPassword: "",
  password: "",
  passwordConfirm: "",
};
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileFields, setProfileFields] = useState(defaultProfileFields);
  const [file, setFile] = useState(null);
  const { name, email, photo } = profileFields;
  const [passwordFields, setPasswordFields] = useState(defaultPasswordFields);
  const { currentPassword, password, passwordConfirm } = passwordFields;
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [string, setString] = useState("");
  const handleChangeProfile = (event) => {
    const { name, value } = event.target;
    setProfileFields({ ...profileFields, [name]: value });
  };
  const user = useSelector((state) => state.user);

  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setPasswordFields({ ...passwordFields, [name]: value });
  };

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    let url;
    if (file) {
      url = await upload(file);
    }

    try {
      const res = await NewRequest.patch("/user/updateMe", {
        ...profileFields,
        photo: url,
      });

      if (res.data.status === "success" || "Success") {
        setString("Profile");
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/profile");
        }, 2000);
      }
      dispatch(userData(res.data.user));
    } catch (error) {
      console.log(error.response.data.message);
      setIsSuccess(false);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    try {
      const res = await NewRequest.patch("/user/updatePassword", {
        ...passwordFields,
      });
      Cookies.set("jwt", res.data.token, { expires: 7 });
      if (res.data.status === "success") {
        setString("Password");
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setIsSuccess(false);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      <div className="updateProfile">
        <form className="form" onSubmit={handleSubmitProfile}>
          <h3 className="profile-head">Update Profile</h3>
          <FormInput
            label="Name"
            type="text"
            placeholder={user ? user.name : ""}
            name="name"
            value={name}
            onChange={handleChangeProfile}
            required
          />

          <FormInput
            label="Email"
            type="email"
            placeholder={user ? user.email : ""}
            name="email"
            value={email}
            onChange={handleChangeProfile}
            required
          />

          <FormInput
            label="Upload Image"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button button="Save Changes" />
        </form>
      </div>

      <div className="updatePassword">
        <form className="form" onSubmit={handleSubmitPassword}>
          <h3 className="profile-head">Update Password</h3>
          <FormInput
            label="Current Password"
            type="password"
            placeholder="********"
            minLength={8}
            name="currentPassword"
            value={currentPassword}
            onChange={handleChangePassword}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="********"
            minLength={8}
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="********"
            minLength={8}
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChangePassword}
          />
          <Button button="Save Password" />
        </form>
        {isSuccess && (
          <Alert
            status={"success"}
            message={`${string} Updated Successfully`}
          />
        )}
        {error && <Alert status={"error"} message={error} />}
      </div>
    </>
  );
};

export default UpdateProfile;
