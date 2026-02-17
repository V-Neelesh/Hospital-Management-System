import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const navLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

const DashboardNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored authentication data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <NavLink className={styles.navBrand} to="/dashboard">Care Hospital</NavLink>
                <div className={styles.navCollapse}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <NavLink className={navLinkClass} to="/home">Home</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink className={navLinkClass} to="/apply-appointment">Apply_Appointment</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink className={navLinkClass} to="/status">Status</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink className={navLinkClass} to="/about">About</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <button  
                                onClick={handleLogout} 
                                className={styles.navLink} 
                                style={{
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    font: 'inherit', 
                                    padding: 0
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored authentication data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <NavLink className={styles.navBrand} to="/admin">Navbar</NavLink>
                <div className={styles.navCollapse}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <NavLink className={navLinkClass} to="/admin">Appoinment_Handling</NavLink>
                            
                        </li>
                        <li className={styles.navItem}>
                            <NavLink className={navLinkClass} to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <button 
                                onClick={handleLogout} 
                                className={styles.navLink} 
                                style={{
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    font: 'inherit', 
                                    padding: 0
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
export { AdminNavbar };
