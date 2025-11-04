import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          WARRIOR<span>STORE</span>
        </Link>

        {/* Links principales */}
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/shop">Tienda</Link>
          <Link to="/contact">Contacto</Link>
        </nav>

        {/* Usuario + carrito */}
        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-name">👋 Hola, {user.name}</span>
              <button onClick={logout} className="btn-logout">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn-register">
                Registrarse
              </Link>
            </>
          )}

          {/* Carrito */}
          <Link to="/cart" className="cart-icon">
            🛒
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
