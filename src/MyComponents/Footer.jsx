// Footer.jsx
import React from "react";
import {FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-7">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ShopperStop. All rights reserved.</p>
        <div className="flex gap-4 text-white text-lg">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
