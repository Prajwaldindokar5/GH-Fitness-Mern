import "./Diet.scss";
import FormInput from "../../components/formInputes/formInputes";
import Button from "../../components/button/Button";
import { useState } from "react";
import NewRequest from "../../utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../state/slice";

const defaultFormFields = {
  age: "",
  height: "",
  weight: "",
  gender: "",
  activity: "",
};
const Diet = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { age, weight, height, gender, activity } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await NewRequest.post("/user/diet", {
        ...formFields,
      });
      dispatch(userData(res.data.user));
      console.log(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="diet">
      <form action="" className="diet-form" onSubmit={handleSubmit}>
        <FormInput
          label="Age"
          placeholder="Enter your Age"
          type="number"
          required
          name="age"
          value={age}
          onChange={handleChange}
        />
        <FormInput
          label="Height"
          placeholder="Enter Height in cm"
          type="number"
          required
          name="height"
          value={height}
          onChange={handleChange}
        />
        <FormInput
          label="Weight"
          placeholder="Enter your Weight"
          type="number"
          required
          name="weight"
          value={weight}
          onChange={handleChange}
        />
        <div className="gender-section">
          <h4>Choose your gender</h4>
          <div>
            <FormInput
              label="Male"
              type="radio"
              required
              checked={gender === "male"}
              name="gender"
              onChange={handleChange}
              value="male"
            />
            <FormInput
              label="Female"
              type="radio"
              required
              checked={gender === "female"}
              name="gender"
              onChange={handleChange}
              value="female"
            />
          </div>
        </div>

        <div className="intrest-section">
          <FormInput
            label="No-Exercise"
            type="radio"
            name="activity"
            required
            checked={activity === "noexercise"}
            value="noexercise"
            onChange={handleChange}
          />
          <FormInput
            label="Little-Exercise"
            type="radio"
            name="activity"
            required
            checked={activity === "littleexercise"}
            value="littleexercise"
            onChange={handleChange}
          />
          <FormInput
            label="Moderate-Exercise"
            type="radio"
            name="activity"
            required
            checked={activity === "moderateexercise"}
            value="moderateexercise"
            onChange={handleChange}
          />
          <FormInput
            label="Intense-Exercise"
            type="radio"
            name="activity"
            required
            checked={activity === "intenseexercise"}
            value="intenseexercise"
            onChange={handleChange}
          />
          <FormInput
            label="Very-Hard-Exercise"
            type="radio"
            name="activity"
            required
            checked={activity === "veryhardexercise"}
            value="veryhardexercise"
            onChange={handleChange}
          />
        </div>

        <Button nameclass="submitBtn" button="Submit" />
      </form>
      <div className="nutrition-plan">
        <p className="name-plan">
          {user ? `${user.name}` : `Hey MR. Please Login`}
        </p>
        <p>
          You have to eat only{" "}
          <strong>{user ? `${user.calories} ` : `0 `}</strong>
          daily <br />
          and the micro-nutrition intake is as given below.
        </p>
        <div className="micros">
          <div className="nutritions">
            <img src="./images/protein.png" alt="" />
            <span>
              Protein: {user ? `${user.micros.protein}g ` : `protein: 0g`}
            </span>
          </div>
          <div className="nutritions">
            <img src="./images/carb.png" alt="" />
            <span>Carbs: {user ? `${user.micros.carbs}g` : `carbs: 0g`}</span>
          </div>
          <div className="nutritions">
            <img src="./images/fat.png" alt="" />
            <span>Fats: {user ? `${user.micros.fat}g` : `fats: 0g`}</span>
          </div>
          <div className="nutritions">
            <img src="./images/fiber.png" alt="" />
            <span>Fiber: 35g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diet;
