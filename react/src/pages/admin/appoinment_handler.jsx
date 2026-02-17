import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../Dashboard/DashboardNavbar";
import styles from "./am.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppoinmentHandler = () => {
    const [patients, setPatients] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [selections, setSelections] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [applicationsRes, doctorsRes] = await Promise.all([
                fetch('http://localhost:5000/api/applications'),
                fetch('http://localhost:5000/api/doctors')
            ]);
            
            const applicationsData = await applicationsRes.json();
            const doctorsData = await doctorsRes.json();

            if (applicationsData.success) {
                setPatients(applicationsData.data);
            }
            if (doctorsData.success) {
                setDoctorsList(Array.isArray(doctorsData.data) ? doctorsData.data : []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectionChange = (patientId, field, value) => {
        setSelections(prev => ({
            ...prev,
            [patientId]: {
                ...prev[patientId],
                [field]: value
            }
        }));
    };

    const getDateValue = (patient) => {
        const selected = selections[patient._id]?.appointmentDate;
        if (selected) return selected; // DatePicker returns Date object directly
        if (patient.appointmentRequest) return new Date(patient.appointmentRequest);
        return null;
    };

    const handleAssign = async (patientId) => {
        const patient = patients.find(p => p._id === patientId);
        const selection = selections[patientId] || {};
        
        const doctorId = selection.doctorId;
        
        // Use selected date or fallback to formatted original date
        let appointmentDate = selection.appointmentDate;
        
        if (!appointmentDate && patient.appointmentRequest) {
            appointmentDate = new Date(patient.appointmentRequest);
        }

        if (!doctorId || !appointmentDate) {
            alert("Please select both a doctor and a date/time.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/applications/${patientId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctor: doctorId,
                    // Ensure we send ISO string to backend
                    appointmentRequest: appointmentDate instanceof Date ? appointmentDate.toISOString() : new Date(appointmentDate).toISOString(),
                    status: 'Approved'
                }),
            });

            const result = await response.json();
            if (result.success) {
                setPatients(prev => prev.map(p => p._id === patientId ? result.data : p));
                
                setSelections(prev => {
                    const next = { ...prev };
                    delete next[patientId];
                    return next;
                });
                alert("Appointment approved and assigned! The patient will be notified via email.");
            }
        } catch (error) {
            alert("Error updating appointment.");
        }
    };

    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (patient.serialNumber && patient.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const pendingCount = patients.filter(p => p.status === 'Pending').length;

    return (
        <div className={styles.container}>
            <AdminNavbar />
            
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Application Management</h1>
                    <p className={styles.subtitle}>Review and assign appointments to incoming patient applications.</p>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search by patient name or ID..." 
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        Total Applications: <span className={styles.statValue}>{patients.length}</span>
                    </div>
                    <div className={styles.statItem}>
                        Pending: <span className={styles.statValue}>{pendingCount}</span>
                    </div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                {filteredPatients.length === 0 ? (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}>📭</span>
                        <p>No applications found matching your criteria.</p>
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Patient Info</th>
                                <th>Problem Description</th>
                                <th>Requested</th>
                                <th>Status</th>
                                <th>Assign Doctor & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => {
                                const isPending = patient.status === 'Pending';
                                const selection = selections[patient._id] || {};
                                
                                return (
                                    <tr key={patient._id}>
                                        <td>
                                            <div className={styles.userCell}>
                                                <span className={styles.userName}>{patient.name}</span>
                                                <div className={styles.userMeta}>
                                                    <span>{patient.age} yrs</span> •
                                                    <span style={{textTransform: 'capitalize'}}>{patient.gender}</span>
                                                </div>
                                                <div className={styles.contactInfo} style={{fontSize: '0.85em', color: '#64748b', marginTop: '4px'}}>
                                                    <div>{patient.email}</div>
                                                    <div>{patient.phone}</div>
                                                </div>
                                                <small style={{color: '#94a3b8'}}>{patient.serialNumber}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.problemText} title={patient.problem}>
                                                {patient.problem}
                                            </div>
                                        </td>
                                        <td>
                                            {new Date(patient.appointmentRequest).toLocaleDateString()}
                                            <br />
                                            <small style={{color: '#64748b'}}>
                                                {new Date(patient.appointmentRequest).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </small>
                                        </td>
                                        <td>
                                            <span className={`${styles.status} ${styles[`status${patient.status}`] || styles.statusPending}`}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td style={{minWidth: '250px'}}>
                                            {isPending ? (
                                                <div className={styles.actions}>
                                                    <select 
                                                        className={styles.select}
                                                        value={selection.doctorId || ""}
                                                        onChange={(e) => handleSelectionChange(patient._id, 'doctorId', e.target.value)}
                                                    >
                                                        <option value="">Select Specialist...</option>
                                                        {doctorsList.map(doc => (
                                                            <option key={doc._id} value={doc._id}>
                                                                {doc.user?.name} - {doc.specialization}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <DatePicker
                                                        selected={getDateValue(patient)}
                                                        onChange={(date) => handleSelectionChange(patient._id, 'appointmentDate', date)}
                                                        showTimeSelect
                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                        className={styles.dateInput}
                                                        placeholderText="Select Date & Time"
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                            ) : (
                                                <div className={styles.userCell}>
                                                    <span className={styles.userName}>{patient.doctor?.user?.name || 'Assigned'}</span>
                                                    <small>{new Date(patient.appointmentRequest).toLocaleString()}</small>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {isPending && (
                                                <button 
                                                    className={styles.assignBtn}
                                                    onClick={() => handleAssign(patient._id)}
                                                    disabled={!selection.doctorId}
                                                >
                                                    Approve & Assign
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AppoinmentHandler;