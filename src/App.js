import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserRoute from "./privateRoutes/UserRoute";
import { API, setAuthToken } from "./config/api";

import {
  AddJourney,
  Bookmarks,
  Home,
  JourneyDetails,
  Modal,
  LoginModal,
  Navbar,
  Profile,
  RegisterModal,
  Footer,
} from "./exports";

import { UserContext } from "./contexts/UserContext";
import { LoginContext, RegisteredProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";

import "./assets/styles/App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (!state.isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    navigate("/");
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <ModalProvider>
        <RegisteredProvider>
          <Navbar />
        </RegisteredProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/journey/:id" element={<JourneyDetails />} />
          <Route exact path="/" element={<UserRoute />}>
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/journey/add" element={<AddJourney />} />
          </Route>
        </Routes>
        <Footer />
      </ModalProvider>
    </>
  );
}

export default App;

export const globalTitle = "The Journey ";
