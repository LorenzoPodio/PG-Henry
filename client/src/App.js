
import { About } from "./components/About/About";
import Purchases from "./components/Purchases/Purchases";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Excursions } from './components/Excursions/Excursions';
import { NavBar } from './components/NavBar/NavBar.jsx';
import Login from './components/Login/Login';
import Register from './components/Registro/Register'
import { Prices } from './components/Prices/Prices';
import { ExcursionDetail } from "./components/ExcursionDetail/ExcursionDetail.jsx";
import { AdminPanel } from './components/AdminPanel/AdminPanel'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/excursiones" element={<Excursions />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Register />} />
        <Route path="/tarifas" element={<Prices />} />
        <Route path="/compras" element={<Purchases />} />
        <Route path="/nosotros" element={<About />} />
        <Route path='/excursion/detalle/:id' element={<ExcursionDetail/>}/>
        <Route path='/panelAdmin' element={<AdminPanel/>}/>
      </Routes>
    </div>
  );
}

export default App;
