import React, { useState } from "react";
import "./RateLimiterDashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function RateLimiterDashboard() {

  const API_URL = "http://localhost:8082";
  const LIMIT = 10;

  /* AUTH STATES */

  const [user, setUser] = useState(localStorage.getItem("userName"));
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* AUTH FUNCTION */

  const handleAuth = async () => {

    if (!email || !password || (!isLoginMode && !name)) {
      alert("Fill all fields");
      return;
    }

    try {

      const url = isLoginMode
        ? `${API_URL}/login`
        : `${API_URL}/signup`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.name) {

        localStorage.setItem("userName", data.name);
        setUser(data.name);

        setName("");
        setEmail("");
        setPassword("");

      } else {

        alert(data.message || "Invalid user");

      }

    } catch (error) {

      alert("Backend server not running");

    }

  };

  const logout = () => {

    localStorage.removeItem("userName");
    setUser(null);

  };
  

  /* RATE LIMIT STATES */

  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState([]);

  const sendRequest = async () => {

    const time = new Date().toLocaleTimeString();

    try {

      const response = await fetch(`${API_URL}/request`, {
        method: "POST"
      });

      const data = await response.json();

      if (data.allowed) {

        setCount(data.count);

        setLogs(prev => [
          { time, status: "ALLOWED" },
          ...prev.slice(0, 8)
        ]);

        setChartData(prev => [
          ...prev,
          { time, requests: data.count }
        ]);

      } else {

        setLogs(prev => [
          { time, status: "BLOCKED" },
          ...prev.slice(0, 8)
        ]);

      }

    } catch {

      alert("Backend not connected");

    }

  };

  const reset = async () => {

    try {

      await fetch(`${API_URL}/reset`, {
        method: "POST"
      });

      setCount(0);
      setLogs([]);
      setChartData([]);

    } catch {

      alert("Reset failed");

    }

  };

  /* AUTH PAGE */

  if (!user) {

    return (

      <div className="authPage">

        <nav className="navbar">
          <div className="logoBox">
            <img src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png" alt="logo"/>
            <span>RateGuard</span>
          </div>
        </nav>

        <div className="authContent">

          <div className="authIntro">
            <h1>RateGuard</h1>
            <p>
              API monitoring platform that protects servers
              by limiting excessive traffic and visualizing
              requests in real time.
            </p>
          </div>

          <div className="authCard">

            <h2>
              {isLoginMode ? "Login" : "Create Account"}
            </h2>

            {!isLoginMode && (

              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            )}

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleAuth}
              className="primaryBtn"
            >
              {isLoginMode ? "Login" : "Signup"}
            </button>

            <p
              className="switchAuth"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode
                ? "Create new account"
                : "Already have account? Login"}
            </p>

          </div>

        </div>

      </div>

    );
  }

  /* DASHBOARD */

  return (

    <div className="dashboard">

      <nav className="navbar">

        <div className="logoBox">
          <img src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png" alt="logo"/>
          <span>RateGuard</span>
        </div>

        <div className="userBox">
          <span>Hi, {user}</span>
          <button onClick={logout} className="logoutBtn">
            Logout
          </button>
        </div>

      </nav>

      <div className="hero">

        <h1>API Rate Limiter Dashboard</h1>
        <p>Monitor request traffic in real time</p>

      </div>

      <div className="mainGrid">

        <div className="card">

          <h3>Request Controller</h3>

          <div className="circle">
            {count}/{LIMIT}
          </div>

          <div className="btnRow">

            <button
              onClick={sendRequest}
              className="primaryBtn"
            >
              Send
            </button>

            <button
              onClick={reset}
              className="secondaryBtn"
            >
              Reset
            </button>

          </div>

        </div>

        <div className="card">

          <h3>Live Request Log</h3>

          {logs.map((log, i) => (

            <div key={i} className={`logItem ${log.status}`}>
              <span>{log.time}</span>
              <span>{log.status}</span>
            </div>

          ))}

        </div>

      </div>

      <div className="card chartCard">

        <h3>Request Analytics</h3>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="requests"
              stroke="#4fc3f7"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );

}