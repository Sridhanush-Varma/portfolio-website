import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [profileImage, setProfileImage] = useState('https://github.com/Sridhanush-Varma.png');
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const ADMIN_PASSWORD = "Deepika@04";

  // Load profile image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Update preview canvas when crop changes
  useEffect(() => {
    if (completedCrop && imgRef.current && previewCanvasRef.current) {
      const updatePreview = async () => {
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        if (!crop || !canvas || !image) return;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        // Set canvas size to match the crop dimensions
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        // Apply device pixel ratio for sharper preview
        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the cropped image
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      };

      updatePreview();
    }
  }, [completedCrop]);

  // Function to handle admin login
  const handleAdminLogin = () => {
    const password = prompt("Enter admin password:");
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert("Invalid password!");
    }
  };

  // Function to handle image file selection
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result.toString() || '');
        setShowCropModal(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Function to handle image load for cropping
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;

    // Create a centered crop with aspect ratio 1:1 (circle)
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // 1:1 aspect ratio
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  };

  // Function to generate the cropped image
  const generateCroppedImage = async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    // Set canvas size to match the crop dimensions with high quality
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    // Apply device pixel ratio for sharper image
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the cropped image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Convert canvas to blob and then to data URL
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      }, 'image/jpeg', 0.95); // Higher quality JPEG
    });
  };

  // Function to save the cropped image
  const saveCroppedImage = async () => {
    try {
      const croppedImageData = await generateCroppedImage();
      setProfileImage(croppedImageData);
      localStorage.setItem('profileImage', croppedImageData);
      setShowCropModal(false);
      setImgSrc('');
    } catch (e) {
      console.error('Error saving cropped image:', e);
    }
  };

  // Function to close the crop modal
  const closeCropModal = () => {
    setShowCropModal(false);
    setImgSrc('');
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
      <div className="nav-container">
        <div className="logo">
          <span>SV</span>
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#summary">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="share-container">
            <button
              className="share-btn"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <i className="fas fa-share-alt"></i> Share
            </button>

            {showShareMenu && (
              <motion.div
                className="share-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <button onClick={() => shareProfile('facebook')}><i className="fab fa-facebook-f"></i> Facebook</button>
                <button onClick={() => shareProfile('twitter')}><i className="fab fa-twitter"></i> Twitter</button>
                <button onClick={() => shareProfile('linkedin')}><i className="fab fa-linkedin-in"></i> LinkedIn</button>
                <button onClick={() => shareProfile('whatsapp')}><i className="fab fa-whatsapp"></i> WhatsApp</button>
                <button onClick={() => shareProfile('email')}><i className="fas fa-envelope"></i> Email</button>
              </motion.div>
            )}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      <div className="header-content">
        <div className="profile-section">
          <motion.div
            className="profile-picture-container"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src={profileImage}
              alt="Profile Picture"
              onLoad={() => setImageLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            {isAdmin && (
              <label htmlFor="profile-upload" className="profile-upload-label">
                <i className="fas fa-camera"></i>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="profile-upload"
                  onChange={onSelectFile}
                />
              </label>
            )}
          </motion.div>
        </div>

        {/* Image Crop Modal */}
        {showCropModal && (
          <div className="crop-modal-overlay">
            <div className="crop-modal">
              <div className="crop-modal-header">
                <h3>Crop Profile Picture</h3>
                <button className="close-modal-btn" onClick={closeCropModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="crop-container">
                {imgSrc && (
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={1}
                    circularCrop
                  >
                    <img
                      ref={imgRef}
                      alt="Crop me"
                      src={imgSrc}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                )}
              </div>
              <div className="crop-preview">
                <h4>Preview</h4>
                <div className="preview-container">
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      width: completedCrop?.width ?? 0,
                      height: completedCrop?.height ?? 0,
                      borderRadius: '50%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
              <div className="crop-actions">
                <button className="cancel-btn" onClick={closeCropModal}>Cancel</button>
                <button className="save-btn" onClick={saveCroppedImage}>Save</button>
              </div>
            </div>
          </div>
        )}

        <div className="header-text">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sridhanush Varma
          </motion.h1>

          <motion.p
            className="profession"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Full Stack Developer & ML/NLP Specialist
          </motion.p>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span><i className="fas fa-envelope"></i> sridhanushvarmasv@outlook.com</span>
            <span><i className="fas fa-phone-alt"></i> 91+ 7799955255</span>
            <span><i className="fas fa-map-marker-alt"></i> Hyderabad, India</span>
          </motion.div>

          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="https://github.com/Sridhanush-Varma" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/sridhanush-varma/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:sridhanushvarmasv@outlook.com">
              <i className="fas fa-envelope"></i>
            </a>
          </motion.div>
        </div>
      </div>

      {!isAdmin && (
        <div className="admin-login-container">
          <button onClick={handleAdminLogin} className="admin-login-btn">
            <i className="fas fa-lock"></i> Admin
          </button>
        </div>
      )}
    </motion.header>
  );
};

export default Header;