import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Excursions } from './components/Excursions/Excursions';
import { NavBar } from './components/NavBar/NavBar.jsx';
import Login from './components/Login/Login';
import Register from './components/Registro/Register'
import { Prices } from './components/Prices/Prices';
import { ExcursionDetail } from "./components/ExcursionDetail/ExcursionDetail.jsx";

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path='/Excursiones' element={<Excursions/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/registro' element={<Register/>}/>
        <Route path='/tarifas' element={<Prices/>}/>
        <Route path='/excursion/detalle/:id' element={<ExcursionDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
