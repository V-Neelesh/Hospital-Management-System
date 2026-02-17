import React, { useState, useEffect } from "react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import styles from "./status.module.css";

const AppointmentStatus = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/applications');
                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }
                const data = await response.json();
                if (data.success) {
                    setApplications(data.data);
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching status:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    // Filter Logic
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    const isGuest = loggedInUser.name === "Guest Patient";

    const filteredApplications = applications.filter(app => {
        // If searching, prioritize search match
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            const nameMatch = app.name.toLowerCase().includes(lowerSearch);
            const serialMatch = app.serialNumber && app.serialNumber.toLowerCase().includes(lowerSearch);
            return nameMatch || serialMatch; 
        }

        // If not searching, distinct behavior for Guest vs Registered
        if (isGuest) {
            return false; // Show nothing by default for guest
        }
        
        // Regular user: show their own apps
        return (app.user === loggedInUser._id) || (!app.user && app.name.toLowerCase() === (loggedInUser.name || "").toLowerCase());
    });


    const getStatusClass = (status) => {
        switch(status.toLowerCase()) {
            case 'approved': return styles.approved;
            case 'rejected': return styles.rejected;
            default: return styles.pending;
        }
    };

    return (
        <div>
            <DashboardNavbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Your Appointment Status</h1>
                
                <div className={styles.searchContainer} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <input 
                        type="text" 
                        placeholder="Search by Name or Serial No..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>

                {loading && <p style={{textAlign: 'center'}}>Loading...</p>}
                {error && <p style={{textAlign: 'center', color: 'red'}}>{error}</p>}

                {!loading && !error && (
                    <div className={styles.resultsArea}>
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map((app) => (
                                <div key={app._id} className={`${styles.statusCard} ${getStatusClass(app.status)}`}>
                                    <div className={styles.cardContent}>
                                        <h3>{app.name} <small style={{fontSize: '0.8em', color: '#666'}}>({app.serialNumber || 'No Serial'})</small></h3>
                                        <p><strong>Problem:</strong> {app.problem}</p>
                                        <p><strong>Date Requested:</strong> {new Date(app.appointmentRequest).toLocaleDateString()}</p>
                                        
                                        {app.doctor && (
                                            <p><strong>Assigned Doctor:</strong> {app.doctor.user?.name || "Dr. Unnamed"} ({app.doctor.specialization})</p>
                                        )}
                                    </div>
                                    <div className={`${styles.statusBadge} ${getStatusClass(app.status)}`}>
                                        {app.status}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noResults}>No applications found for your account ({loggedInUser.name}).</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentStatus;
