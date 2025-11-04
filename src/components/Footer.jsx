import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h3>WARRIOR STORE</h3>
          <p>Ropa urbana creada para marcar tu estilo.</p>
        </div>

        <div className="footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Ayuda</a>
        </div>

        <div className="footer-socials">
          <a href="#" target="_blank">Instagram</a>
          <a href="#" target="_blank">TikTok</a>
          <a href="#" target="_blank">Facebook</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Warrior Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
