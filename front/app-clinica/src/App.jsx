
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./componentes/Home"
import FormCirrose from './componentes/FormCirrose'
import CadastroPaciente from './componentes/CadastroPaciente'
function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path = '/cirrhosis-level' element= {<FormCirrose/>}/>
            <Route exact path = '/patient-registration' element= {<CadastroPaciente/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;