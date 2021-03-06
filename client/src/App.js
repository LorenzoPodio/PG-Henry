import { About } from "./components/About/About";
import Purchases from "./components/Purchases/Purchases";
import { Routes, Route } from "react-router-dom";
import { Excursions } from "./components/Excursions/Excursions";
import { ExcursionsPost } from "./components/ExcursionsPost/ExcursionsPost";
import Login from "./components/Login/Login";
import { Prices } from "./components/Prices/Prices";
import { ExcursionDetail } from "./components/ExcursionDetail/ExcursionDetail.jsx";
import Stepper from "./components/PurchaseSteps/Container/Stepper";
import { AdminPanelTabs } from "./components/AdminPanelTabs/AdminPanelTabs.jsx";
import { Footer } from "./components/Footer/Footer";
import NavBar2 from "./components/NavBar/NavBar2";
import { Landing } from "./components/Landing/Landing";
import { EditExcursion } from "./components/EditExcursion/EditExcursion";
import MapaSearch from "./components/MapBoxGL/MapBoxSearch";

import { Profile } from "./components/Profile/Profile";
import { useCartContext } from "./context/CartContext";
import { useExcursionsContext } from "./context/ExcursionsContext";

function App() {
  const { isAdmin } = useCartContext();
  const { isBanned } = useExcursionsContext();

  return (
    <div className="flex-col h-screen">
      <NavBar2 />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        {isAdmin && (
          <Route exact path="/crearExcursion" element={<ExcursionsPost />} />
        )}
        {isAdmin && (
          <Route exact path="/editarExcursion" element={<EditExcursion />} />
        )}{" "}
        <Route exact path="/excursiones" element={<Excursions />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/tarifas" element={<Prices />} />
        <Route exact path="/compras" element={<Purchases />} />
        <Route exact path="/nosotros" element={<About />} />
        <Route
          exact
          path="/excursion/detalle/:id"
          element={<ExcursionDetail />}
        />
        {!isBanned && <Route exact path="/checkout" element={<Stepper />} />}
        {isAdmin && <Route path="/panelAdmin" element={<AdminPanelTabs />} />}
        <Route path="/miPerfil" element={<Profile />} />
        <Route path="/mapa" element={<MapaSearch />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
