import { useState, useEffect } from "react";
import { AdminNavbar } from "./DashboardNavbar";
import SummaryCards from "./SummaryCards";
import RecentTable from "./RecentTable";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
	const [doctors, setDoctors] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [doctorsRes, appointmentsRes] = await Promise.all([
					fetch('http://localhost:5000/api/doctors'),
					fetch('http://localhost:5000/api/appointments')
				]);

				if (!doctorsRes.ok || !appointmentsRes.ok) {
					throw new Error('Failed to fetch data');
				}

				const doctorsData = await doctorsRes.json();
				const appointmentsData = await appointmentsRes.json();

				// Transform backend data to frontend format
				const formattedDoctors = doctorsData.data.map(doc => ({
					id: doc._id,
					name: doc.user?.name || 'Unknown',
					department: doc.specialization,
					shift: doc.schedule && doc.schedule.length > 0 
						? `${doc.schedule[0].startTime} - ${doc.schedule[0].endTime}` 
						: 'No Schedule'
				}));

				const formattedAppointments = appointmentsData.data.map(apt => ({
					id: apt._id,
					patient: apt.patient?.name || apt.patientName || 'Unknown Patient',
					doctor: apt.doctor?.user?.name || 'Unknown Doctor',
					time: new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
					status: apt.status
				}));

				setDoctors(formattedDoctors);
				setAppointments(formattedAppointments);
			} catch (err) {
				console.error("Error fetching dashboard data:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Calculate summary based on real data
	const summaryItems = [
		{ label: "Total Doctors", value: doctors.length },
		{ label: "Today Appointments", value: appointments.length },
		{ label: "Open Departments", value: new Set(doctors.map(d => d.department)).size },
	];

	if (loading) return <div className={styles.dashboard}>Loading...</div>;
	if (error) return <div className={styles.dashboard}>Error: {error}</div>;

	return (
		<div className={styles.dashboard}>
			<AdminNavbar />
			<header className={styles.header}>
				<div>
					<p className={styles.kicker}>Hospital Management System</p>
					<h1 className={styles.title}>Dashboard Overview</h1>
				</div>
				<span className={styles.dateChip}>Today</span>
			</header>

			<SummaryCards items={summaryItems} />

			<section className={styles.grid}>
				<div className={styles.panel}>
					<h2 className={styles.panelTitle}>Doctors On Duty</h2>
					<ul className={styles.doctorList}>
						{doctors.map((doctor) => (
							<li key={doctor.id} className={styles.doctorItem}>
								<div>
									<p className={styles.doctorName}>{doctor.name}</p>
									<p className={styles.doctorMeta}>{doctor.department}</p>
								</div>
								<span className={styles.shift}>{doctor.shift}</span>
							</li>
						))}
					</ul>
				</div>

				<div className={styles.panel}>
					<h2 className={styles.panelTitle}>Doctor Timetable</h2>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Doctor</th>
								<th>Department</th>
								<th>Shift</th>
							</tr>
						</thead>
						<tbody>
							{doctors.map((doctor) => (
								<tr key={doctor.id}>
									<td>{doctor.name}</td>
									<td>{doctor.department}</td>
									<td>{doctor.shift}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>


			<section className={styles.panel}>
				<h2 className={styles.panelTitle}>Appointments</h2>
				<RecentTable appointments={appointments} />
			</section>
		</div>
	);
};

export default Dashboard;
