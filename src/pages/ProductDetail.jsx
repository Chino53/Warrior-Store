import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch {
        console.warn("⚠️ Backend no disponible, usando mock local");

        const mockProducts = [
          {
            id: 1,
            name: "Remera Warrior Basic",
            price: 8900,
            description:
              "Remera de algodón premium con corte regular fit y detalles minimalistas. Perfecta para el uso diario.",
            image:
              "https://via.placeholder.com/700x800?text=Remera+Warrior+Basic",
            sizes: ["S", "M", "L", "XL"],
          },
          {
            id: 2,
            name: "Buzo Oversize Street",
            price: 17500,
            description:
              "Buzo oversize con tejido suave y estampado exclusivo de Warrior. Estilo urbano y cómodo.",
            image:
              "https://via.placeholder.com/700x800?text=Buzo+Oversize+Street",
            sizes: ["M", "L", "XL"],
          },
          {
            id: 3,
            name: "Campera Urban Fit",
            price: 25900,
            description:
              "Campera liviana con diseño moderno. Perfecta para entretiempo, con cierre metálico y bolsillos amplios.",
            image:
              "https://via.placeholder.com/700x800?text=Campera+Urban+Fit",
            sizes: ["M", "L"],
          },
        ];

        const found = mockProducts.find((p) => p.id === parseInt(id));
        setProduct(found || null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  const handleAdd = () => {
    if (!size) {
      alert("Seleccioná un talle antes de agregar al carrito");
      return;
    }
    addToCart({ ...product, size, quantity });
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>

          {product.sizes && (
            <div className="sizes">
              <p className="label">Talle:</p>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quantity">
            <p className="label">Cantidad:</p>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <button className="btn-add" onClick={handleAdd}>
            Agregar al carrito
          </button>

          <Link to="/" className="back-link">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
