import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} Online Art Gallery. All Rights Reserved.</p>
        <p>
          <a href="/terms" className="mx-2">
            Terms & Conditions
          </a>
          |
          <a href="/privacy" className="mx-2">
            Privacy Policy
          </a>
          |
          <a href="/contact" className="mx-2">
            Contact Us
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
