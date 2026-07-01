import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {

    const location = useLocation();

    return (
        <>

            {
                location.pathname !== "/" &&

                <header className="barra-superior">

                    <Link
                        to="/"
                        className="logo-menu"
                    >
                        🏠
                        <span>Casa Movimiento</span>
                    </Link>

                </header>
            }

            <main
                className={
                    location.pathname !== "/"
                        ? "contenido-layout"
                        : ""
                }
            >

                <Outlet />

            </main>

        </>
    );

}

export default Layout;