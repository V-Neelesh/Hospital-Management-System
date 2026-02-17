import React from 'react';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import styles from './about.module.css';
import MissionImage from '../../assets/Mission and Vission.png';
import HistoryImage from '../../assets/History.png';
import Core_valuesImage from '../../assets/Core values.png';

const About = () => {
    return (
        <div className={styles.about}>
            <DashboardNavbar />
            
            <div className={styles.content}>
                
                {/* Header Section */}
                <div className={styles.headerSection}>
                    <h2 className={styles.title}>About Us</h2>
                    <p style={{fontSize: '1.2rem', color: '#666'}}>Dedicated to your health, committed to your care.</p>
                </div>

                {/* Mission & Vision Section */}
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Mission & Vision</h3>
                    <div className={styles.flexContainer}>
                        <div className={`${styles.imageWrapper} ${styles.animateLeft}`}>
                            <img src={MissionImage} alt="Mission and Vision" className={styles.image} />
                        </div>
                        <div className={`${styles.textBlock} ${styles.animateRight}`}>
                            <p style={{marginBottom: '15px'}}><strong>Mission:</strong> To provide compassionate, patient-centered healthcare with cutting-edge technology and highly skilled professionals.</p>
                            <p><strong>Vision:</strong> To be a leader in healthcare innovation, delivering excellence and accessibility to every patient, every time.</p>
                        </div>
                    </div>
                </section>

                {/* History Section */}
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Our Journey</h3>
                    <div className={`${styles.flexContainer} ${styles.flexReverse}`}>
                        <div className={`${styles.imageWrapper} ${styles.animateRight}`}>
                            <img src={HistoryImage} alt="History" className={styles.image} />
                        </div>
                        <div className={`${styles.textBlock} ${styles.animateLeft}`}>
                            <p>Founded in 1995, our hospital began as a small community clinic. Over the years, we’ve grown into a multi-specialty institution.</p>
                            <div className={styles.timeline}>
                                <div className={styles.timelineItem}>
                                    <span className={styles.timelineYear}>1995</span> Established as a 20-bed clinic
                                </div>
                                <div className={styles.timelineItem}>
                                    <span className={styles.timelineYear}>2005</span> Expanded into a 200-bed hospital
                                </div>
                                <div className={styles.timelineItem}>
                                    <span className={styles.timelineYear}>2015</span> Introduced robotic surgery labs
                                </div>
                                <div className={styles.timelineItem}>
                                    <span className={styles.timelineYear}>2025</span> Top regional healthcare provider
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Core Values</h3>
                    <div className={styles.flexContainer}>
                         <div className={styles.imageWrapper} style={{flex: '0.4'}}>
                            <img src={Core_valuesImage} alt="Core Values" className={styles.image} /> 
                         </div>
                         <div className={styles.valuesGrid} style={{flex: '1', marginTop: 0}}>
                            <div className={styles.valueCard}>
                                <h4>Compassion</h4>
                                <p>We treat every patient with empathy and kindness.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h4>Integrity</h4>
                                <p>We uphold the highest standards of honesty and ethics.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h4>Patient Care</h4>
                                <p>Putting patients first in every decision.</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h4>Innovation</h4>
                                <p>Adopting modern medical technologies.</p>
                            </div>
                         </div>
                    </div>
                </section>

                {/* Leadership Section */}
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Leadership Team</h3>
                    <div className={styles.teamGrid}>
                        <div className={styles.teamCard}>
                            <strong>Dr. Ananya Rao, MD</strong>
                            <span className={styles.teamRole}>Chief Medical Officer</span>
                            <p>Specialist in internal medicine with 20+ years of experience.</p>
                        </div>
                        <div className={styles.teamCard}>
                            <strong>Mr. Rajesh Kumar</strong>
                            <span className={styles.teamRole}>Hospital Director</span>
                            <p>Oversees operations and ensures top-tier patient services.</p>
                        </div>
                        <div className={styles.teamCard}>
                            <strong>Dr. Meera Patel, MS</strong>
                            <span className={styles.teamRole}>Head of Surgery</span>
                            <p>Pioneer in minimally invasive surgical procedures.</p>
                        </div>
                        <div className={styles.teamCard}>
                             <strong>Accreditations</strong>
                             <span className={styles.teamRole}>Quality Standards</span>
                             <p>NABH & ISO 9001:2015 Certified Healthcare Provider.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <div className={styles.contactBox}>
                    <div className={styles.contactItem} style={{textAlign: 'center'}}>
                        <strong>Address</strong>
                        <p>123 Health Avenue, Vijayawada, AP</p>
                    </div>
                    <div className={styles.contactItem} style={{textAlign: 'center'}}>
                        <strong>Phone</strong>
                        <p>+91-98765-43210</p>
                    </div>
                    <div className={styles.contactItem} style={{textAlign: 'center'}}>
                        <strong>Email</strong>
                        <p>info@yourhospital.com</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
