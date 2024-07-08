import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Admin from "./Admin";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.scss";
import { ClientsProvider } from "./context/ClientsContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { RolesProvider } from "./context/RolesContext";

function App() {
  return (
    <ClientsProvider>
      <CategoriesProvider>
        <RolesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </RolesProvider>
      </CategoriesProvider>
    </ClientsProvider>
  );
}

export default App;
