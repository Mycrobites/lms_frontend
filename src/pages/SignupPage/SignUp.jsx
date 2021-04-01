import React, { useState } from "react";
import { useHistory , Link} from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/dashboard")
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label>
            <p>Username</p>
            <input
              required
              type="text"
              value={username}
              name="username"
              placeholder="Enter username..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="password">
          <label>
            <p>Password</p>

            <input
              required
              type="password"
              value={password}
              name="password"
              placeholder="Enter password..."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>


        <div className="confirm-password">
          <label>
            <p>confirm password</p>

            <input
              required
              type="password"
              value={confirmPassword}
              name="currentPassword"
              placeholder="Confirm password..."
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </label>
        </div>

        <button type="submit">Sign up</button>
        <p className='login-redirect'>Already have a account ? <Link to='/login'>login here</Link> </p>
      </form>

      
    </div>
  );
};

export default SignUp;

