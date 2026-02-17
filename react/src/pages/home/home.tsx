import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import WelcomeImage from '../../assets/Welcome.png';
import style from './home.module.css';

const Home: React.FC = () => {
  return (
    <div className={style.container}>
      <DashboardNavbar />
      
      {/* Hero Section */}
      <section className={style.heroSection}>
        <div className={style.heroContainer}>
            <div className={style.heroContent}>
                <h1 className={style.heroTitle}>Welcome to Care Hospital</h1>
                <p className={style.heroSubtitle}>
                    Compassionate healthcare dedicated to your well-being.
                    We combine advanced medical expertise with a human touch.
                </p>
                
                <div className={style.ctaGroup}>
                    <NavLink to="/apply-appointment" className={style.primaryBtn}>
                        Book Appointment
                    </NavLink>
                    <NavLink to="/about" className={style.secondaryBtn}>
                        Learn More
                    </NavLink>
                </div>
            </div>

            <div className={style.heroImageWrapper}>
                <img src={WelcomeImage} alt="Welcome to Care" className={style.heroImage} />
            </div>
        </div>
      </section>

      {/* Why Choose Us / Features */}
      <section className={style.featuresSection}> 
        <h2 className={style.sectionTitle}>Why Choose Care Hospital?</h2>
        <div className={style.cardsGrid}>
            <div className={style.featureCard}>
                <h3>Compassionate Care</h3>
                <p>We treat every patient with empathy and kindness, ensuring a supportive environment for healing and recovery.</p>
            </div>
            
            <div className={style.featureCard}>
                <h3>Advanced Technology</h3>
                <p>Equipped with state-of-the-art medical facilities and robotic surgery labs for precise and effective treatments.</p>
            </div>
            
            <div className={style.featureCard}>
                <h3>Expert Team</h3>
                <p>Our team of highly skilled doctors, nurses, and staff work tirelessly to deliver excellence at every step.</p>
            </div>

            <div className={style.featureCard}>
                <h3>24/7 Support</h3>
                <p>Dedicated round-the-clock medical attention to ensure your health is always our top priority.</p>
            </div>
        </div>
      </section>
      
      {/* Short mission snippet */}
      <section className={style.featuresSection} style={{textAlign: 'center', maxWidth: '800px'}}>
        <h2 className={style.sectionTitle}>Our Commitment</h2>
        <p style={{fontSize: '1.2rem', lineHeight: '1.8', color: '#555'}}>
         We believe that healthcare is not just about curing illness—it’s about caring for people. 
         At Care, we value innovation, empathy, and integrity. Our facilities are designed to offer comfort and confidence, 
         while our services are tailored to meet the unique needs of each patient. Together, we strive to make 
         healthcare accessible, reliable, and truly caring.
        </p>
      </section>

    </div>
  );
};

export default Home;

