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
import { ServicesProvider } from "./context/ServicesContext";
import { ProductsProvider } from "./context/ProductsContext";
import { ClientsAssetsProvider } from "./context/ClientsAssetsContext";
import { AuthProvider } from "./context/AuthContext";
import { ServiceOrdersProvider } from "./context/ServiceOrdersContext";
import { QuotesProvider } from "./context/QuotesContext";
import { PurchaseOrdersProvider } from "./context/PurchaseOrdersContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ClientsProvider>
        <CategoriesProvider>
          <RolesProvider>
            <EventProvider>
              <PersonalProvider>
                <ContactsProvider>
                  <SuppliersProvider>
                    <ServicesProvider>
                      <ProductsProvider>
                        <ClientsAssetsProvider>
                          <ServiceOrdersProvider>
                            <PurchaseOrdersProvider>
                              <QuotesProvider>
                                <Router>
                                  <Routes>
                                    <Route path="/" element={<LoginPage />} />
                                    <Route
                                      path="/admin/*"
                                      element={
                                        <ProtectedRoute element={Admin} />
                                      }
                                    />
                                    <Route
                                      path="*"
                                      element={<NotFoundPage />}
                                    />
                                  </Routes>
                                </Router>
                              </QuotesProvider>
                            </PurchaseOrdersProvider>
                          </ServiceOrdersProvider>
                        </ClientsAssetsProvider>
                      </ProductsProvider>
                    </ServicesProvider>
                  </SuppliersProvider>
                </ContactsProvider>
              </PersonalProvider>
            </EventProvider>
          </RolesProvider>
        </CategoriesProvider>
      </ClientsProvider>
    </AuthProvider>
  );
}

export default App;
