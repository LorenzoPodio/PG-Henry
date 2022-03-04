import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Excursions } from './components/Excursions/Excursions';
import { ExcursionsPost } from './components/ExcursionsPost/ExcursionsPost';


function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Excursions/>}/>
        <Route exact path='/crearExcursion' element={<ExcursionsPost/>}/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;
