import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Admin from "./Admin";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.scss";
import { ClientsProvider } from "./context/ClientsContext";

function App() {
  return (
    <ClientsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ClientsProvider>
  );
}

export default App;
