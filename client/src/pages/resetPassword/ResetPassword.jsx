import FormInput from "../../components/formInputes/formInputes";
import "./ResetPassword.scss";
import Button from "../../components/button/Button";
import { useState } from "react";
import NewRequest from "../../utils/newRequest";
import Alert from "../../components/alert/alert";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  password: "",
  passwordConfirm: "",
};
const ResetPassword = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, passwordConfirm } = formFields;
  const [isSuccess, setisSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = pathname.split("/")[2];
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await NewRequest.patch(`/user/resetPassword/${token}`, {
        ...formFields,
      });
      if (res.data.status === "success") {
        setisSuccess(true);
        setTimeout(() => {
          setisSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setisSuccess(false);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  return (
    <div className="resetPassword">
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3 className="reset-head">Enter new Password</h3>
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          minLength={8}
          name="password"
          value={password}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
          minLength={8}
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange}
        />

        <Button button="Submit" />
      </form>
      {isSuccess && (
        <Alert status={"success"} message={"Password Reset Successfull"} />
      )}
      {error && <Alert status={"error"} message={error} />}
    </div>
  );
};

export default ResetPassword;
