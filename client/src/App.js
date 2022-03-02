import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Excursiones } from './components/Excursiones/Excursiones';


function App() {
  return (
    <div>
      <Routes>
        <Route excat path='/' element={<Excursiones/>}/>
        <Route/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
