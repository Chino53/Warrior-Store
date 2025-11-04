import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard"; // 🔹 Usará este componente si existe
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 🔹 Primero intenta cargar desde el backend
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("⚠️ Error cargando productos:", err);
        // 🔹 Si falla el backend, muestra datos simulados
        setProducts([
          {
            id: 1,
            name: "Remera Warrior Basic",
            price: 8900,
            image: "https://via.placeholder.com/500x600?text=Remera+Warrior",
          },
          {
            id: 2,
            name: "Buzo Oversize Street",
            price: 17500,
            image: "https://via.placeholder.com/500x600?text=Buzo+Street",
          },
          {
            id: 3,
            name: "Campera Urban Fit",
            price: 25900,
            image: "https://via.placeholder.com/500x600?text=Campera+Urban",
          },
          {
            id: 4,
            name: "Jogging Premium",
            price: 14900,
            image: "https://via.placeholder.com/500x600?text=Jogging+Premium",
          },
        ]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero principal */}
      <section className="hero">
        <div className="hero-text">
          <h1>Warrior Store</h1>
          <p>Ropa urbana para quienes marcan su propio camino.</p>
          <Link to="/shop" className="btn-primary">
            Ver colección
          </Link>
        </div>
      </section>

      {/* Sección de productos */}
      <section className="product-section">
        <h2 className="section-title">Nuevos ingresos</h2>

        <div className="product-grid">
          {products.map((product) =>
            ProductCard ? (
              // 🔹 Si existe el componente ProductCard, lo usa
              <ProductCard key={product.id} product={product} />
            ) : (
              // 🔹 Si no existe, usa el layout clásico
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="info">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => addToCart(product)}>Agregar</button>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
