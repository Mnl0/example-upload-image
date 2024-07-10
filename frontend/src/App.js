import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Formulario from './pages/Formulario.jsx';
import Resultado from './pages/Resultado.jsx'
import './app.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/formulario' element={<Formulario />} />
        <Route path='/resultado' element={<Resultado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
