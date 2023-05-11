import { Link } from "react-router-dom";
import NewRequest from "../../utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import { setMuscles } from "../../state/slice";

import "./Strength.scss";
import { useEffect, useState } from "react";

const Strength = () => {
  const dispatch = useDispatch();
  const muscles = useSelector((state) => state.muscles);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await NewRequest.get("/workout");
      dispatch(setMuscles(res.data.workouts));
    };
    fetchdata();
  }, []);

  return (
    <div className="strength-section">
      <div className="workout">
        <h3>Muscles</h3>

        {muscles.map((muscle) => {
          return (
            <div key={muscle._id} className="muscle-name">
              <Link to={muscle.slug} className="link muscle">
                <p className="name-muscle">{muscle.muscleName}</p>
                <img
                  src={`../images/${muscle.muscleImg}`}
                  alt=""
                  className="muscle-icon"
                />
              </Link>
            </div>
          );
        })}
      </div>
      <h1 className="strength-guide">Click on above muscle to see result</h1>
    </div>
  );
};

export default Strength;
