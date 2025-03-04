import React, { useState, useEffect } from 'react';
import './App.css'; // This will reference the CSS file I'll create below

function RentalApp() {
  // State management
  const [activeTab, setActiveTab] = useState('cars');
  const [vehicles, setVehicles] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: '',
    endDate: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for cars and bikes
  useEffect(() => {
    const sampleVehicles = {
      cars: [
        { id: 1, name: 'Tesla Model 3', type: 'car', price: 120, image: '/api/placeholder/300/200', rating: 4.8, available: true },
        { id: 2, name: 'Toyota Camry', type: 'car', price: 80, image: '/api/placeholder/300/200', rating: 4.5, available: true },
        { id: 3, name: 'Honda Civic', type: 'car', price: 70, image: '/api/placeholder/300/200', rating: 4.3, available: true },
        { id: 4, name: 'Ford Mustang', type: 'car', price: 150, image: '/api/placeholder/300/200', rating: 4.9, available: false },
        { id: 5, name: 'BMW 3 Series', type: 'car', price: 110, image: '/api/placeholder/300/200', rating: 4.6, available: true },
      ],
      bikes: [
        { id: 101, name: 'Kawasaki Ninja', type: 'bike', price: 75, image: '/api/placeholder/300/200', rating: 4.7, available: true },
        { id: 102, name: 'Harley Davidson', type: 'bike', price: 95, image: '/api/placeholder/300/200', rating: 4.9, available: true },
        { id: 103, name: 'Yamaha MT-07', type: 'bike', price: 65, image: '/api/placeholder/300/200', rating: 4.4, available: false },
        { id: 104, name: 'Honda CBR', type: 'bike', price: 60, image: '/api/placeholder/300/200', rating: 4.3, available: true },
        { id: 105, name: 'Ducati Monster', type: 'bike', price: 90, image: '/api/placeholder/300/200', rating: 4.8, available: true },
      ]
    };

    // Simulate loading
    setTimeout(() => {
      setVehicles(sampleVehicles);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter vehicles based on search term
  const filteredVehicles = vehicles[activeTab]?.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Add vehicle to cart
  const addToCart = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  // Complete booking
  const completeBooking = (e) => {
    e.preventDefault();
    
    if (selectedVehicle) {
      const newBooking = {
        ...selectedVehicle,
        ...bookingDetails,
        bookingId: Math.floor(Math.random() * 1000000)
      };
      
      setCart([...cart, newBooking]);
      setShowModal(false);
      setBookingDetails({
        startDate: '',
        endDate: '',
        name: '',
        email: '',
        phone: ''
      });
      
      // Show success notification (in real app, this would be more sophisticated)
      alert(`Successfully booked ${newBooking.name}!`);
    }
  };

  // Handle input changes for booking form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  // Calculate total price in cart
  const totalPrice = cart.reduce((total, item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return total + (item.price * days);
  }, 0);

  return (
    <div className="rental-app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>Speedy<span>Rentals</span></h1>
        </div>
        <div className={`nav-container ${isMenuOpen ? 'open' : ''}`}>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className="navigation">
            <a href="#home" className="nav-link">Home</a>
            <a href="#vehicles" className="nav-link">Vehicles</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
        <div className="cart-icon" onClick={() => setActiveTab('cart')}>
          <span className="material-icons">shopping_cart</span>
          <span className="cart-count">{cart.length}</span>
        </div>
      </header>

      {/* Hero section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="slide-in-left">Explore The World On Your Terms</h1>
          <p className="slide-in-right">Premium Cars & Bikes For Your Journey</p>
          <div className="hero-buttons">
            <button className="btn primary-btn pulse" onClick={() => setActiveTab('cars')}>Rent a Car</button>
            <button className="btn secondary-btn pulse" onClick={() => setActiveTab('bikes')}>Rent a Bike</button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="main-content" id="vehicles">
        {/* Tab navigation */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'cars' ? 'active' : ''}`} 
            onClick={() => setActiveTab('cars')}
          >
            Cars
          </button>
          <button 
            className={`tab ${activeTab === 'bikes' ? 'active' : ''}`} 
            onClick={() => setActiveTab('bikes')}
          >
            Bikes
          </button>
          <button 
            className={`tab ${activeTab === 'cart' ? 'active' : ''}`} 
            onClick={() => setActiveTab('cart')}
          >
            My Bookings ({cart.length})
          </button>
        </div>

        {/* Search */}
        {(activeTab === 'cars' || activeTab === 'bikes') && (
          <div className="search-container">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading vehicles...</p>
          </div>
        )}

        {/* Vehicle list */}
        {!isLoading && (activeTab === 'cars' || activeTab === 'bikes') && (
          <div className="vehicle-grid">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map(vehicle => (
                <div 
                  key={vehicle.id} 
                  className={`vehicle-card ${vehicle.available ? '' : 'unavailable'}`}
                >
                  <div className="vehicle-image">
                    <img src={vehicle.image} alt={vehicle.name} />
                    {!vehicle.available && <div className="unavailable-overlay">Unavailable</div>}
                  </div>
                  <div className="vehicle-details">
                    <h3>{vehicle.name}</h3>
                    <div className="vehicle-rating">
                      {Array(5).fill(0).map((_, index) => (
                        <span key={index} className={index < Math.floor(vehicle.rating) ? 'star filled' : 'star'}>★</span>
                      ))}
                      <span className="rating-value">{vehicle.rating}</span>
                    </div>
                    <p className="vehicle-price">${vehicle.price}/day</p>
                    <button 
                      className="btn primary-btn" 
                      disabled={!vehicle.available}
                      onClick={() => vehicle.available && addToCart(vehicle)}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No {activeTab} found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Cart/Bookings */}
        {activeTab === 'cart' && (
          <div className="cart-container">
            <h2>Your Bookings</h2>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>You have no bookings yet.</p>
                <button className="btn primary-btn" onClick={() => setActiveTab('cars')}>Browse Cars</button>
              </div>
            ) : (
              <>
                <div className="booking-list">
                  {cart.map((booking, index) => {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);
                    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                    const totalCost = booking.price * days;
                    
                    return (
                      <div key={index} className="booking-card">
                        <div className="booking-image">
                          <img src={booking.image} alt={booking.name} />
                        </div>
                        <div className="booking-details">
                          <h3>{booking.name}</h3>
                          <p>Booking ID: #{booking.bookingId}</p>
                          <p>Dates: {booking.startDate} to {booking.endDate}</p>
                          <p>Duration: {days} days</p>
                          <p>Cost: ${totalCost}</p>
                        </div>
                        <button 
                          className="btn delete-btn"
                          onClick={() => setCart(cart.filter((_, i) => i !== index))}
                        >
                          Cancel
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-summary">
                  <h3>Summary</h3>
                  <p>Total Bookings: {cart.length}</p>
                  <p>Total Cost: ${totalPrice}</p>
                  <button className="btn primary-btn">Checkout</button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* About section */}
      <section className="about-section" id="about">
        <h2>About SpeedyRentals</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="/api/placeholder/400/300" alt="About us" />
          </div>
          <div className="about-text">
            <p>SpeedyRentals has been providing premium car and bike rental services since 2010. With our fleet of well-maintained vehicles and customer-focused approach, we ensure you have the best travel experience.</p>
            <p>Our mission is to offer affordable, reliable, and convenient rental options for all your transportation needs.</p>
            <div className="stats">
              <div className="stat-item">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>500+</h3>
                <p>Vehicles</p>
              </div>
              <div className="stat-item">
                <h3>50k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>123 Main Street, Anytown, USA</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <p>info@speedyrentals.com</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="btn primary-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Speedy<span>Rentals</span></h2>
          </div>
          <p>© 2025 SpeedyRentals. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showModal && selectedVehicle && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Book {selectedVehicle.name}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-vehicle-info">
                <img src={selectedVehicle.image} alt={selectedVehicle.name} />
                <div>
                  <p>Price: ${selectedVehicle.price}/day</p>
                  <p>Type: {selectedVehicle.type.charAt(0).toUpperCase() + selectedVehicle.type.slice(1)}</p>
                </div>
              </div>
              <form onSubmit={completeBooking}>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input 
                    type="date" 
                    name="startDate" 
                    value={bookingDetails.startDate} 
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                  <input 
                    type="date" 
                    name="endDate" 
                    value={bookingDetails.endDate} 
                    onChange={handleInputChange}
                    min={bookingDetails.startDate || new Date().toISOString().split('T')[0]}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={bookingDetails.name} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={bookingDetails.email} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={bookingDetails.phone} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <button type="submit" className="btn primary-btn">Complete Booking</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentalApp;