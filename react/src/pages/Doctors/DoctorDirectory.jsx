import { useState, useEffect } from "react";
import styles from "./DoctorDirectory.module.css";
// import AdminNavbar from "../Dashboard/DashboardNavbar"; // Assuming you might want navigation

const DoctorDirectory = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/doctors');
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) return <div className={styles.loading}>Loading doctor directory...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.container}>
            {/* <AdminNavbar /> If navbar is needed */}
            <h1 className={styles.title}>Our Specialists</h1>
            
            <div className={styles.grid}>
                {doctors.map((doctor) => (
                    <div key={doctor._id} className={styles.card}>
                        <div className={styles.header}>
                            <div className={styles.avatar}>
                                {doctor.user?.name ? doctor.user.name.charAt(4) : "D"}
                            </div>
                            <h2 className={styles.name}>{doctor.user?.name}</h2>
                            <p className={styles.specialization}>{doctor.specialization}</p>
                        </div>
                        
                        <div className={styles.body}>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Qualification:</span>
                                <span className={styles.value}>{doctor.qualifications || 'MBBS'}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Experience:</span>
                                <span className={styles.value}>{doctor.experience ? `${doctor.experience} Years` : 'N/A'}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Email:</span>
                                <span className={styles.value}>{doctor.user?.email}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Contact:</span>
                                <span className={styles.value}>{doctor.contactNumber || 'N/A'}</span>
                            </div>

                            {doctor.schedule && doctor.schedule.length > 0 && (
                                <div className={styles.schedule}>
                                    <span className={styles.scheduleTitle}>Weekly Schedule</span>
                                    <ul className={styles.scheduleList}>
                                        {doctor.schedule.map((slot, index) => (
                                            <li key={index} className={styles.scheduleItem}>
                                                <span className={styles.day}>{slot.day}</span>
                                                <span className={styles.time}>{slot.startTime} - {slot.endTime}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.actions}>
                            <button className={styles.bookBtn}>Book Appointment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorDirectory;
