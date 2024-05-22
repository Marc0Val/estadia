import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
// paginas a usar
import PersonalPage from "./pages/PersonalPage";
import ActiveCustomerPage from "./pages/ActiveCustomerPage";
import CategoryPage from "./pages/CategoryPage";
import ContactsPage from "./pages/ContactsPage";
import CustomersPage from "./pages/CustomersPage";
import DocumentPage from "./pages/DocumentPage";
import OrderServicePage from "./pages/OrderServicePage";
// deshabil hasta el momento 21/05/2024
// import PolicyPage from "./pages/PolicyPage";
import ProductsPage from "./pages/ProductsPage";
import ProvidersPage from "./pages/ProvidersPage";
import PurchaseOrderPage from "./pages/PurchaseOrderPage";
import QuotesPage from "./pages/QuotesPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceOrdersPage from "./pages/ServiceOrdersPage";
import SettingsPage from "./pages/ConfigPages/SettingsPage";
import RolPage from "./pages/ConfigPages/RolPage";
import FormularioOrdenServicio from "./pages/Forms/FormularioordenServicio";

const Admin = () => {
  return (
    <div className="contenedor">
      <Sidebar />
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<PersonalPage />} />
          <Route path="/activos-de-clientes" element={<ActiveCustomerPage />} />
          <Route path="/categorias" element={<CategoryPage />} />
          <Route path="/contactos" element={<ContactsPage />} />
          <Route path="/clientes" element={<CustomersPage />} />
          <Route path="/documentos" element={<DocumentPage />} />
          {/* <Route path="/ordenes-de-servicio" element={<OrderServicePage />} /> */}
          {/* <Route path="/polizas" element={<PolicyPage />} /> */}
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/proveedores" element={<ProvidersPage />} />
          <Route path="/ordenes-de-compra" element={<PurchaseOrderPage />} />
          <Route path="/cotizaciones" element={<QuotesPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          {/* <Route path="/ordenes-de-compra" element={<ServiceOrdersPage />} /> */}
          <Route path="/ordenesdservicio" element={<ServiceOrdersPage />} />
          <Route path="/configuraciones" element={<SettingsPage />} />
          <Route path="/roles" element={<RolPage />} />
          <Route
            path="/formulario-orden-servicio"
            element={<FormularioOrdenServicio />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
