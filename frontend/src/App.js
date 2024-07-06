import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Admin from "./Admin";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.scss";
import { ClientsProvider } from "./context/ClientsContext";
import { CategoriesProvider } from "./context/CategoriesContext";

function App() {
  return (
    <ClientsProvider>
      <CategoriesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CategoriesProvider>
    </ClientsProvider>
  );
}

export default App;
