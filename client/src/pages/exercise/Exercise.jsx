import { Link, useLocation } from "react-router-dom";
import "./Exercise.scss";
import { useEffect, useState } from "react";
import NewRequest from "../../utils/newRequest";

const Exercise = () => {
  const { pathname } = useLocation();
  const muscle = pathname.split("/")[2];
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      const res = await NewRequest.get(`/workout/${muscle}`);
      setExercise(res.data.workout);
    };
    fetchdata();
  }, []);
  // console.log(exercise.exercises);
  return (
    <div className="exercise">
      <div className="exercise-list">
        <Link to="/strength" className="link">
          <button className="back-btn">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </Link>
        <h3>Exercises</h3>

        {exercise.exercises &&
          Object.keys(exercise.exercises).map((key) => {
            const { exerciseName, exerciseRepRange, exerciseImg } =
              exercise.exercises[key];
            return (
              <div className="list">
                <span>{exerciseName}</span>
                <span>{exerciseRepRange}</span>
                <img
                  className="set-image"
                  src={`../../images/${exerciseImg}`}
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Exercise;
