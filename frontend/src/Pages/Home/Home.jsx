import "./home.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  return (
    <div>

      <img src="/Home.jpg" alt="" className="home-img" />

      <div className="home-form">
        <h1>Welcome to Dynasty Delights Restaurant</h1>
        <div className="button-group">
          <Link to="/login">
            <button className="btn btn-primary">Reserve A Table</button>
          </Link>
          <Link to="/menu">
            <button className="btn btn-primary">See our Menu</button>
          </Link>
          <Link to="/gallery">
            <button className="btn btn-primary">See our Gallery</button>
          </Link>
        </div>

        <div className="user-link">
          <Link to="/register-user">
            <button className="mr">Sign Up</button>
          </Link>

          <Link to="/login">
            <button className="ml">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
