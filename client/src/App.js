import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Excursions } from './components/Excursions/Excursions';
import { NavBar } from './components/NavBar/NavBar.jsx';
import { Prices } from './components/Prices/Prices';

function App() {
  return (
    <div>
        {<NavBar/>}
      <Routes>
        <Route exact path='/' element={<Excursions/>}/>
        <Route path='/Tarifas' element={<Prices/>}/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
