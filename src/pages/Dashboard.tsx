import { Link } from 'react-router-dom';

/** * Dashboard principal de Casa Movimiento. 
 * * * Centraliza el acceso a los distintos módulos del sistema mediante accesos directos. */
function Dashboard(){
    // Renderizado del menú principal
    return(
        <div className="dashboard">
            <h1 className="titulo-principal">
                CASA MOVIMIENTO
            </h1>

            {/* Gestión de ingresos y egresos */}
            <div className="dashboard-grid">
                <Link to="/movimientos" className="card-dashboard">💰
                    <h3>Movimientos</h3>
                </Link>
                
                {/* Gestión de pagos de alumnos */}
                <Link to="/pagos" className="card-dashboard">💸
                    <h3>Pagos</h3>
                </Link>

                {/* Consulta de balances y recaudación */}
                <Link to="/balance" className="card-dashboard">📊
                    <h3>Balance</h3>
                </Link>

                {/* Administración de alumnos */}
                <Link to="/alumnos"className="card-dashboard">👥
                    <h3>Alumnos</h3>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;