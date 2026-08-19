import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Alumnos from './pages/Alumnos';
import Pagos from './pages/Pagos';
import Balance from "./pages/Balance";
import Movimientos from "./pages/Movimientos";
import Layout from "./components/Layout";
import Profesores from "./pages/Profesores";
import Clases from "./pages/Clases";

/**
 * Componente raíz de la aplicación.
 *
 * Configura el sistema de navegación utilizando
 * React Router y define las rutas disponibles
 * dentro de Casa Movimiento.
 */
function App(){
    return(
        <BrowserRouter>

                <Routes >
                    <Route element={<Layout />}>
                    
                        {/* Dashboard principal */}
                        <Route path="/" element={<Dashboard/>}/>

                        {/* Gestión de alumnos */}
                        <Route path="/alumnos" element={<Alumnos/>}/>

                        {/* Gestión de profesores */}
                        <Route path="/profesores" element={<Profesores />}/>
                        {/* Gestión de pagos */}
                        <Route path="/pagos" element={<Pagos/>} />

                        {/* Consulta de balances y recaudación */}
                        <Route path="/balance" element={<Balance/>}/>

                        {/* Registro de ingresos y egresos */}
                        <Route path="/movimientos" element={<Movimientos />} />

                        {/* gestion de clases */}
                        <Route path="/clases" element={<Clases />} />
                    </Route>
                </Routes>
        </BrowserRouter>
    );
}

export default App;