import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Excursions } from './components/Excursions/Excursions';


function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Excursions/>}/>
        <Route/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
