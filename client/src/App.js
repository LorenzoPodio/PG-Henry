import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Excursions } from './components/Excursions/Excursions';
import { NavBar } from './components/NavBar/NavBar.jsx';

function App() {
  return (
    <div>
        {<NavBar/>}
      <Routes>
        <Route exact path='/' element={<Excursions/>}/>
        <Route/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
