import FormInput from "../../components/formInputes/formInputes";
import "./ForgotPassword.scss";
import Button from "../../components/button/Button";
import { useState } from "react";
import NewRequest from "../../utils/newRequest";
import Alert from "../../components/alert/alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await NewRequest.post("/user/forgotPassword", {
        email,
      });

      if (res.data.status === "success") {
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      }
    } catch (error) {
      setIsSuccess(false);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      });
    }
  };
  return (
    <div className="forgotPassword">
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3 className="forgot-head">Enter your registered email</h3>
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your Email"
          required
          onChange={handleChange}
          value={email}
        />

        <Button button="Submit" />
      </form>
      {isSuccess && (
        <Alert
          status={"success"}
          message={"Mail send to your registerd email"}
        />
      )}
      {error && <Alert status={"error"} message={error} />}
    </div>
  );
};

export default ForgotPassword;
