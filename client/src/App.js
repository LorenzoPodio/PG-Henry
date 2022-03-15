import { About } from "./components/About/About";
import Purchases from "./components/Purchases/Purchases";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Excursions } from "./components/Excursions/Excursions";
import { ExcursionsPost } from "./components/ExcursionsPost/ExcursionsPost";
import Login from "./components/Login/Login";
import Register from "./components/Registro/Register";
import { Prices } from "./components/Prices/Prices";
import { ExcursionDetail } from "./components/ExcursionDetail/ExcursionDetail.jsx";
import Stepper from "./components/PurchaseSteps/Container/Stepper";
import { AdminPanelTabs } from "./components/AdminPanelTabs/AdminPanelTabs.jsx";
import { Footer } from "./components/Footer/Footer";
import NavBar2 from "./components/NavBar/NavBar2";
import { Landing } from "./components/Landing/Landing";
import { EditExcursion } from "./components/EditExcursion/EditExcursion";

import Cart from "./components/Cart/Cart";

import Auth0ProviderWithHistory from "./Auth0Provider/auth0Provider";
import { Profile } from "./components/Profile/Profile";
import { AdminMailer } from "./components/AdminMailer/AdminMailer";


function App() {
  return (
    <Auth0ProviderWithHistory>

    <div className="App">
      <NavBar2/>
      <Routes>

        <Route exact path="/" element={<Landing />} />
          <Route exact path="/crearExcursion" element={<ExcursionsPost />} />
          <Route exact path="/editarExcursion" element={<EditExcursion />} />
          <Route exact path="/excursiones" element={<Excursions />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registro" element={<Register />} />
          <Route path="/tarifas" element={<Prices />} />
          <Route path="/compras" element={<Purchases />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/excursion/detalle/:id" element={<ExcursionDetail />} />
          <Route exact path="/checkout" element={<Stepper />} />
          <Route path="/panelAdmin" element={<AdminPanelTabs />} />
          <Route path="/miPerfil" element={<Profile />} />
          <Route path="/adminMailer" element={<AdminMailer />} />
      </Routes>
      <Footer/>
    </div>

    </Auth0ProviderWithHistory>
  );
}

export default App;
