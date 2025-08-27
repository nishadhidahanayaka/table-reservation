import "./signup.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);

  const addUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mailingAddress", mailingAddress);
      formData.append("billingAddress", billingAddress);
      formData.append("paymentMethod", paymentMethod);
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      await axios.post("http://localhost:4000/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch({ type: "LOGIN_SUCCESS" });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="signup">
        <h4>Sign Up</h4>
        <form onSubmit={addUser} encType="multipart/form-data">
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label>Mailing Address</label>
          <input
            type="text"
            onChange={(e) => setMailingAddress(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label>Billing Address</label>
          <input
            type="text"
            onChange={(e) => setBillingAddress(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label>Payment Method</label>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="form-control mb-3"
          >
            <option disabled selected value="">
              -- Select --
            </option>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
            <option value="check">Check</option>
          </select>

          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            className="form-control mb-3"
          />

          <button disabled={loading} className="btn btn-primary">
            Sign Up
          </button>

          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
