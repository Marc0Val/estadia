import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// paginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// componentes
import Login from "./components/Login";
import Register from "./components/Register";
// import ProtectedPage from "./pages/ProtectedPage";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />


      </Routes>
    </Router>
  );
}

export default App;
