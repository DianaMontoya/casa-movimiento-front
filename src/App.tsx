import {
    BrowserRouter,
    Routes,
    Route
}
from 'react-router-dom';

import Dashboard
from './pages/Dashboard';

import Alumnos
from './pages/Alumnos';

import Pagos
from './pages/Pagos';

function App(){

    return(

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard/>}
                />

                <Route
                    path="/alumnos"
                    element={<Alumnos/>}
                />

                <Route
                    path="/pagos"
                    element={<Pagos/>}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;