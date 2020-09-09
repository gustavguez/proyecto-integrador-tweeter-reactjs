import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./userSlice";

function LoginForm({ history }) {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.user.loggingIn);
  const error = useSelector((state) => state.user.loginError);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }, history));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter email or username"
        required
        value={username}
        onChange={(e) => setUser(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      <br />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <br />
      <Link to="/signup">Don't have an account?</Link>
    </form>
  );
}

export default LoginForm;
