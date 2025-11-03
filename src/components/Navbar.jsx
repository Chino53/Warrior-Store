import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Warrior Store</h2>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/cart">Carrito</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/register">Registrarse</Link>
      </div>
    </nav>
  );
}

export default Navbar;
