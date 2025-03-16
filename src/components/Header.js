import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const ADMIN_PASSWORD = "Deepika@04";

  const handleAdminLogin = () => {
    const password = prompt("Enter admin password:");
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert("Invalid password!");
    }
  };

  const shareProfile = (platform) => {
    const profileUrl = window.location.href;
    const text = "Check out Sridhanush Varma's portfolio!";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(profileUrl)}&title=${encodeURIComponent(text)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + profileUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent('Check out this portfolio: ' + profileUrl)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="vector-container">
        <div className="vector"></div>
        <div className="vector"></div>
        <div className="vector"></div>
        <div className="vector"></div>
        <div className="vector"></div>
        <div className="vector"></div>
      </div>
      <div className="share-container top-right">
        <button 
          className="share-btn"
          onClick={() => setShowShareMenu(!showShareMenu)}
        >
          Share Profile 📤
        </button>
        
        {showShareMenu && (
          <motion.div 
            className="share-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button onClick={() => shareProfile('facebook')}>Facebook</button>
            <button onClick={() => shareProfile('twitter')}>Twitter</button>
            <button onClick={() => shareProfile('linkedin')}>LinkedIn</button>
            <button onClick={() => shareProfile('whatsapp')}>WhatsApp</button>
            <button onClick={() => shareProfile('email')}>Email</button>
          </motion.div>
        )}
      </div>

      <div className="profile-section">
        <motion.div 
          className="profile-picture-container"
          whileHover={{ scale: 1.1 }}
        >
          <motion.img
            src="https://github.com/Sridhanush-Varma.png"
            alt="Profile Picture"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          {isAdmin && (
            <input type="file" accept="image/*" className="profile-upload" />
          )}
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Sridhanush Varma
      </motion.h1>

      <motion.div 
        className="contact-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>📧 sridhanushvarmasv@gmail.com</span>
        <span>📱 91+ 7799955255</span>
        <span>📍 Hyderabad, Telangana, India</span>
      </motion.div>

      {!isAdmin && (
        <div className="admin-login-container">
          <button onClick={handleAdminLogin} className="admin-login-btn">
            Admin Login
          </button>
        </div>
      )}
    </motion.header>
  );
};

export default Header; 