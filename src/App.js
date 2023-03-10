import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import API from "./utils/API";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleProject from "./pages/SingleProject";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import AllProjects from "./pages/AllProjects";
// import { useNavigate } from "react-router-dom";

import "./App.css";
import Headerbootstrap from "./components/Headerbootstrap";
import EditProject from "./pages/EditProject";
import DemoApp from "./pages/Calender";

function App() {
  const [userId, setUserId] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [school, setSchool] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [language, setLanguage] = useState("")
  const [picture, setPicture] = useState("")
  // const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // console.log("storedtoken:" + storedToken);
      API.getUserFromToken(storedToken).then((data) => {
        if (data.user) {
          // console.log("data:" + data);
          setToken(storedToken);
          setIsLoggedIn(true);
          setUserId(data.user.id);
          setUserEmail(data.user.email);
        }
      });
    } else {
      console.log("no stored token");
      // navigate("/login");
    } 
  }, []);

  const handleLoginSubmit = (userObj) => {
    API.login({
      email: userObj.email,
      password: userObj.password,
    }).then((data) => {
      console.log(data);
      if (data.token) {
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        setUserEmail(data.user.email);
        setPicture(data.user.profile_picture)
        setFirstName(data.user.first_name)
        localStorage.setItem("token", data.token);
      }
    });
  };

  const handleSignupSubmit = (userObj) => {
    API.signup(userObj).then((data) => {
      console.log(data);
      if (data.token) {
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        setUserEmail(data.user.email);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setPassword(data.user.password);
        setSchool(data.user.school);
        setCity(data.user.city);
        setState(data.user.state);
        setLanguage(data.user.language);
        setPicture(data.user.profile_picture);
        localStorage.setItem("token", data.token);
      }
      console.log(picture)
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken("");
    setUserId(0);
    setUserEmail("");
    setPicture("")
  };

  return (
    <div>
      <Router>
        <Headerbootstrap
        first_name={first_name}
        picture={picture}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          handleLogout={handleLogout}
        />
        <main className="mainContainer">
          <Routes>
            <Route
              path="/signup"
              element={
                <Signup
                  isLoggedIn={isLoggedIn}
                  handleSignupSubmit={handleSignupSubmit}
                  handleLoginSubmit={handleLoginSubmit}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  handleLoginSubmit={handleLoginSubmit}
                />
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/login"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  handleLoginSubmit={handleLoginSubmit}
                  // handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/project/:id"
              element={<SingleProject token={token}
              userId={userId} />}
            />
            <Route path="/edit-project/:id" element={<EditProject token={token} />} />
            <Route path="/create" element={<NewProject token={token} />} />
            <Route path="/calendar" element={<DemoApp token={token} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/community-projects" element={<AllProjects />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
