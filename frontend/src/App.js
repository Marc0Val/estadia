import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Admin from "./Admin";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.scss";
import { ClientsProvider } from "./context/ClientsContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { RolesProvider } from "./context/RolesContext";
import { EventProvider } from "./context/TaskContext";
import { PersonalProvider } from "./context/PersonalContext";
import { ContactsProvider } from "./context/ContactsContext";
import { SuppliersProvider } from "./context/SuppliersContext";

function App() {
  return (
    <ClientsProvider>
      <CategoriesProvider>
        <RolesProvider>
          <EventProvider>
            <PersonalProvider>
              <ContactsProvider>
                <SuppliersProvider>
                  <Router>
                    <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/admin/*" element={<Admin />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Router>
                </SuppliersProvider>
              </ContactsProvider>
            </PersonalProvider>
          </EventProvider>
        </RolesProvider>
      </CategoriesProvider>
    </ClientsProvider>
  );
}

export default App;
