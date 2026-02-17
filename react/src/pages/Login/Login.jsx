import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("patient");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (userType === "admin") {
            if (trimmedUsername === "admin" && trimmedPassword === "admin") {
                setError("");
                setSuccess("Login successful");
                localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
                navigate("/admin");
            } else {
                setError("Invalid admin credentials");
                setSuccess("");
            }
        } else {
            // Patient "Direct Access" Logic
            localStorage.setItem("user", JSON.stringify({ name: "Guest Patient", role: "patient" }));
            setSuccess("Entering system...");
            navigate("/home");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.pageTitle}>Hospital Management System Login</h2>
            <div className={styles.loginCard}>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input 
                            type="radio" 
                            name="userType" 
                            value="patient" 
                            checked={userType === "patient"} 
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Patient
                    </label>
                    <label className={styles.radioLabel}>
                        <input 
                            type="radio" 
                            name="userType" 
                            value="admin" 
                            checked={userType === "admin"} 
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Admin
                    </label>
                </div>

                <form onSubmit={handleLogin} className={styles.loginForm}>
                    {userType === "admin" ? (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className={styles.loginButton}>Login as Admin</button>
                        </>
                    ) : (
                        <div className={styles.guestMessage}>
                            <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                                Welcome! Click below to view services and book appointments.
                            </p>
                            <button type="submit" className={styles.loginButton}>Enter as Patient</button>
                        </div>
                    )}
                </form>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </div>
        </div>
    );
};

export default Login;