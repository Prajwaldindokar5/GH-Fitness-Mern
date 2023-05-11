import Alert from "../../components/alert/alert";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <span className="quote">
          The Pain is <br /> The Best Tool
        </span>
        <span className="info-lines">
          If you want something you've never had,you must be willing to
          <br />
          do something you've never done you get yourself intoshape.
          <br />
          You will get the most valuable things from this website.
        </span>
        <button className="service-btn">Learn More</button>
      </div>
      <h2 className="service-header">Services</h2>
      <div className="services">
        <div className="service">
          <Link to="/strength" className="strength serv link" href="/strength">
            <span className="material-symbols-outlined icons strength-icon">
              fitness_center
            </span>
            <h3 className="service-head">Strength Training</h3>
          </Link>
          <Link to="/diet" className="diet-icon serv link" href="/diet">
            <span className="material-symbols-outlined icons diet-icon">
              receipt_long
            </span>
            <h3 className="service-head">Diet Plan</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
