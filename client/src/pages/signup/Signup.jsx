import FormInput from "../../components/formInputes/formInputes";
import "./Signup.scss";
import Button from "../../components/button/Button";
import { useState } from "react";
import NewRequest from "../../utils/newRequest";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userData } from "../../state/slice";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/alert/alert";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, passwordConfirm } = formFields;
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await NewRequest.post("/user/signup", {
        ...formFields,
      });

      Cookies.set("jwt", res.data.token, { expires: 7 });
      dispatch(userData(res.data.user));
      if (res.data.status === "success") {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setIsSuccess(false);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  return (
    <div>
      <form action="" className="form" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          placeholder="Enter your Name"
          required
          name="name"
          value={name}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your Email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your Password"
          required
          minLength={8}
          name="password"
          value={password}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="Enter your Password Again"
          required
          minLength={8}
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <Button button="Sign up" />
      </form>
      {isSuccess && (
        <Alert status={"success"} message={"Account Created Successfully"} />
      )}
      {error && <Alert status={"error"} message={error} />}
    </div>
  );
};

export default Signup;
