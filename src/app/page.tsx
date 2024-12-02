import Layout from './layout';
import "./home.css";

const Home = () => {
  return (
    <div>
      <section id="home" className="section home flex-container">
        <div className="text-content">
          <h1>ZaPP, making your asset</h1>
          <h1>transfer simple and secure!</h1>
          <p>An AI bot to help you make secure and simple asset transfer,</p>
          <p>while assisting you throughout the process, and maximizing the</p>
          <p>yield while allowing you to connect your secure wallet and</p>
          <p>transferring assets with ease.</p>
        </div>
        <div className="image-content">
          <img src="./wallll.png" alt="Description of image" className="home-image" />
        </div>
      </section>

      {/* Border Separator */}
      <div className="section-separator"></div>

      <section id="about" className="section about">
        <h1>Welcome to ZaPP!</h1>
        <p>At Zapp, we are pioneering the future of asset management through advanced artificial intelligence.</p>
        <p>Our mission is to empower individuals and businesses to navigate the complexities of digital transactions
           with ease.</p>

        <p>Zapp is not just another AI bot; it is your trusted partner in secure transactions.</p>
        <p>We leverage cutting-edge technology to ensure that every asset transfer is protected, efficient,</p>
        <p>and seamless. Our intelligent algorithms analyze market trends and user behavior to optimize your</p> 
        <p>transactions, maximizing yield while minimizing risk.</p>

        <h2>Why Choose Zapp?</h2>

        <p>Prioritization of Security: Your assets are safely stored and transferred.</p>
        <p>User-Friendly Experience</p>
        <p>Continuous Improvement: Improving constantly to meet your needs.</p>

        <h2>Experience the future of secure transactions with Zapp</h2>
        <h3>Where intelligence meets security.</h3>
      </section>

      <div className="section-separator"></div>

      <section id="services" className="section services flex-container">
        <div className="text-content">
          <h1>Our Services</h1>
          <ul>
            <li>1. Web3 Wallet: For secure transactions</li>
            <li>2. ZaPP AI Bot: For all round assistance.</li>
            <li>3. Yield Maximization</li>
          </ul>
        </div>
        <div className="image-content">
          <img src="./bank.jpg" alt="Description of image" className="service-image" />
        </div>
      </section>

      <div className="section-separator"></div>

      {/* Contact Us Section */}
      <section id="contact" className="section contact">
        <h2>Contact Us</h2>
        <p>📞 Phone: +123 456 7890</p>
        <p>✉️ Email: support@zapp.com</p>
        <p>🏠 Address: Whitefield, Bengaluru, KA, India</p>
      </section>

      <div className="section-separator"></div>
    </div>
  );
};

export default Home;