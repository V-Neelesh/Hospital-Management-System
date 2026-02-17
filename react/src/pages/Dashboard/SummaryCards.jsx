import styles from "./Dashboard.module.css";

const getIcon = (label) => {
    switch(label) {
        case "Total Doctors": return "👨‍⚕️";
        case "Today Appointments": return "📅";
        case "Open Departments": return "🏥";
        default: return "📊";
    }
};

const SummaryCards = ({ items }) => {
	return (
		<section className={styles.summary}>
			{items.map((item) => (
				<div key={item.label} className={styles.card}>
                    <div className={styles.cardIcon}>
                        {getIcon(item.label)}
                    </div>
					<div className={styles.cardContent}>
                        <p className={styles.cardLabel}>{item.label}</p>
                        <p className={styles.cardValue}>{item.value}</p>
                    </div>
				</div>
			))}
		</section>
	);
};

export default SummaryCards;
