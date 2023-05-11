import FormInput from "../../components/formInputes/formInputes";
import "./Login.scss";
import Button from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NewRequest from "../../utils/newRequest";
import { useDispatch } from "react-redux";
import { userData } from "../../state/slice";
import Cookies from "js-cookie";
import Alert from "../../components/alert/alert";

const defaultFormFields = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [error, setError] = useState(null);
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const cookieValue = Cookies.get("jwt");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await NewRequest.post("/user/login", {
        email,
        password,
      });

      if (res.data.status === "success") {
        setIsSuccessfull(true);
        setTimeout(() => navigate("/"), 2000);
      }

      Cookies.set("jwt", res.data.token, { expires: 7 });

      dispatch(userData(res.data.user));
    } catch (error) {
      setIsSuccessfull(false);
      setError(error.response.data.message);
      setTimeout(() => setError(null), 3000);
    }
  };
  return (
    <div className="login">
      <form action="" className="form" onSubmit={handleSubmit}>
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

        <Button button="Login" />
        <Link to="/forgotPassword" className="link forgot-link">
          forgot password?
        </Link>
      </form>
      {isSuccessfull && (
        <Alert status={"success"} message={"Login Successfull"} />
      )}
      {error && <Alert status={"error"} message={error} />}
    </div>
  );
};

export default Login;
