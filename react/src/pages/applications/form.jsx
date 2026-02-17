import { useState, useEffect } from "react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import styles from "./form.module.css";
import appointmentImage from "../../assets/Copilot_20260211_135706.png";

const ApplicationForm = () => {
    const [serialNumber, setSerialNumber] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        problem: "",
        appointmentRequest: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.name && user.name !== "Guest Patient") {
            setFormData(prev => ({ 
                ...prev, 
                name: user.name,
                email: user.email || "",
                phone: user.phone || ""
            }));
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        
        try {
            const body = {
                ...formData,
                age: Number(formData.age),
                user: user._id || null 
            };
            
            console.log("Submitting application:", body);

            const response = await fetch('http://localhost:5000/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                // Show Modal instead of alert
                setSerialNumber(data.data.serialNumber);
                
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    age: "",
                    gender: "",
                    problem: "",
                    appointmentRequest: "",
                });
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert(`Failed to submit application: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className={styles.applicationForm}>
            <DashboardNavbar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Application Form</h2>
                    <p>Submit the details to request a hospital appointment.</p>
                </div>
                <div className={styles.panel}>
                    <form className={styles.card} onSubmit={handleSubmit}>
                        <label className={styles.field}>
                            Name
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            Phone Number
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            Age
                            <input
                                type="number"
                                name="age"
                                min="0"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter age"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            Gender
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </label>

                        <label className={styles.field}>
                            Problem
                            <textarea
                                name="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                placeholder="Describe the problem"
                                rows="4"
                                required
                            />
                        </label>

                        <label className={styles.field}>
                            Request for Appointment
                            <input
                                type="datetime-local"
                                name="appointmentRequest"
                                value={formData.appointmentRequest}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <button type="submit" className={styles.submit}>Submit</button>
                    </form>
                    <div className={styles.imagePanel}>
                        <img
                            src={appointmentImage}
                            alt="Doctor with hospital illustration"
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {serialNumber && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 style={{color: '#fff', marginBottom: '1rem'}}>Application Submitted!</h2>
                        <p>Your application has been received. Please note your Serial Number for future tracking:</p>
                        
                        <span className={styles.serialNumber}>
                            {serialNumber}
                        </span>
                        
                        <p className={styles.note}>
                            Please take a screenshot or write this number down. 
                            You can use it to check your status later.
                        </p>
                        
                        <button 
                            className={styles.closeButton}
                            onClick={() => setSerialNumber(null)}
                        >
                            OK, I have noted it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationForm;
