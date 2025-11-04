import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con el pago.");
      navigate("/login");
      return;
    }

    try {
      // Enviar el carrito al backend
      const res = await axios.post("http://localhost:5000/api/checkout", {
        userId: user.id,
        items: cart,
        total,
      });
      console.log("✅ Pedido creado:", res.data);

      alert("Compra realizada con éxito 🎉");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("❌ Error en el checkout:", err);
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <div className="cart-container">
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} width="80" />
                <div className="info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <div className="buttons">
                    <button onClick={() => addToCart(item)}>＋</button>
                    <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={handleCheckout}>Finalizar compra</button>
            <button onClick={clearCart} style={{ marginLeft: "10px" }}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
