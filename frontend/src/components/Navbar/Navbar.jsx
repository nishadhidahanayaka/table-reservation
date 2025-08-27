import { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import { useLogout } from "../../hooks/useLogout";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const handleClick = () => {
    logout()
    
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none"}}>
        <img src="icon.jpg" alt="Logo" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
        <span className="logo">Dynasty Delights</span>
          
        </Link>
        {user ? <div>
           <Link to="/reserve-table"><button className="navButton">Reserve Table</button></Link>
           <Link to="/" onClick={handleClick}><button className="navButton">Log out</button></Link>
           <Link to="/profile"><button className="navButton">Profile</button></Link>
          <span className="button-margin">{user.username}</span>
          </div> : (
          <div className="navItems">
             <Link to=""><button className="navButton">Home</button></Link>
             <Link to="/menu"><button className="navButton">Menu</button></Link>
             <Link to="/gallery"><button className="navButton">Gallery</button></Link>
             <Link to="/login"><button className="navButton">Login</button></Link>
              <Link to="/register-user"><button className="navButton">Sign Up</button></Link>
            <Link to="/login"><button className="navButton">Reserve Table</button></Link>
           
            
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar