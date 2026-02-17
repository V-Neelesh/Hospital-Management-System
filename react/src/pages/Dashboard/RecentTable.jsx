import styles from "./Dashboard.module.css";

const getStatusClass = (status) => {
    switch (status) {
        case "Confirmed":
        case "Completed":
            return styles.statusConfirmed;
        case "Pending":
            return styles.statusPending;
        case "Cancelled":
            return styles.statusCancelled;
        case "Scheduled":
            return styles.statusScheduled;
        default:
            return styles.status;
    }
};

const RecentTable = ({ appointments }) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Patient</th>
					<th>Doctor</th>
					<th>Time</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{appointments.map((appointment) => (
					<tr key={appointment.id}>
						<td>{appointment.patient}</td>
						<td>{appointment.doctor}</td>
						<td>{appointment.time}</td>
						<td>
							<span className={`${styles.status} ${getStatusClass(appointment.status)}`}>
								{appointment.status}
							</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default RecentTable;
