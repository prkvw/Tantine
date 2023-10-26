// libs
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// utils
import { HOME, LOGIN, REGISTER } from "./utils/constants";

// pages
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
