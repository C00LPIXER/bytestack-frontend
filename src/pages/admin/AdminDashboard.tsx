import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearAdmin } from "@/redux/slices/adminAuthSlice";
// import { getAdminAnalytics
import { adminLogout } from "@/service/admin/api/adminApi";
import { toast } from "sonner";

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  adminUsers: number;
}

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useSelector((state: RootState) => state.adminAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    // const fetchAnalytics = async () => {
    //   try {
    //     // const response = await getAdminAnalytics();
    //     if (response.success) {
    //       setAnalytics(response.analytics);
    //     } else {
    //       setError(response.message);
    //     }
    //   } catch (err: any) {
    //     setError(err.response?.data?.message || "Failed to load analytics");
    //     if (err.response?.status === 401 || err.response?.status === 403) {
    //       dispatch(clearAdmin());
    //       navigate("/admin/login");
    //     }
    //   }
    // };

    // fetchAnalytics();
  }, [navigate, dispatch, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await adminLogout();
      dispatch(clearAdmin());
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {admin?.email}!</p>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      {error && <p style={styles.error}>{error}</p>}
      {analytics ? (
        <div style={styles.analytics}>
          <h3>Analytics</h3>
          <p>Total Users: {analytics.totalUsers}</p>
          <p>Active Users: {analytics.activeUsers}</p>
          <p>Banned Users: {analytics.bannedUsers}</p>
          <p>Admin Users: {analytics.adminUsers}</p>
        </div>
      ) : (
        !error && <p>Loading analytics...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center" as const,
  },
  logoutButton: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
    padding: "8px 16px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  analytics: {
    marginTop: "20px",
    textAlign: "left" as const,
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default AdminDashboard;