import { Link } from 'react-router-dom';

function Dashboard(){

    return(

        <div className="dashboard">

            <h1 className="titulo-principal">

                CASA MOVIMIENTO

            </h1>

            <div className="dashboard-grid">

                <Link
                    to="/ingresos"
                    className="card-dashboard"
                >
                    💰
                    <h3>Ingresos</h3>
                </Link>

                <Link
                    to="/pagos"
                    className="card-dashboard"
                >
                    💸
                    <h3>Pagos</h3>
                </Link>

                <Link
                    to="/balance"
                    className="card-dashboard"
                >
                    📊
                    <h3>Balance</h3>
                </Link>

                <Link
                    to="/alumnos"
                    className="card-dashboard"
                >
                    👥
                    <h3>Alumnos</h3>
                </Link>

            </div>

        </div>

    );

}

export default Dashboard;