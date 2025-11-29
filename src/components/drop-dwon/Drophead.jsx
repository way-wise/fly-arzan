import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut, useIsAuthenticated } from "@/hooks/useAuth";

const Drophead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useIsAuthenticated();
  const signOutMutation = useSignOut();

  const handleLogout = async () => {
    try {
      await signOutMutation.mutateAsync();
      localStorage.removeItem("searchDetails");
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const displayName = user?.name || user?.email || "Admin";

  return (
    <div className="Drophead">
      {/* Admin Button */}
      <button onClick={() => setIsOpen(!isOpen)}>
        {displayName} ▼
      </button>
      {/* Dropdown Box */}
      {isOpen && (
        <div className="Drophead-logoout">
          {isAuthenticated && (
            <div className="Drophead-user-info" style={{ padding: "8px 12px", borderBottom: "1px solid #eee", marginBottom: "4px" }}>
              <div style={{ fontSize: "12px", color: "#666" }}>{user?.email}</div>
              <div style={{ fontSize: "11px", color: "#999", textTransform: "capitalize" }}>
                Role: {user?.role || "user"}
              </div>
            </div>
          )}
          <button onClick={handleLogout} disabled={signOutMutation.isPending}>
            {signOutMutation.isPending ? "Logging out..." : "Logout"}
            <svg id="Layer_2" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
              <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="43.95" x2="468.05" y1="43.95" y2="468.05">
                <stop offset="0" stopColor="#2492ff"/>
                <stop offset="1" stopColor="#0043ae"/>
              </linearGradient>
              <g id="Icon">
                <path id="_94" d="m362 0h-212c-82.8 0-150 67.2-150 150v212c0 82.8 67.2 150 150 150h212c82.8 0 150-67.2 150-150v-212c0-82.8-67.2-150-150-150zm100 362c0 55.14-44.86 100-100 100h-212c-55.14 0-100-44.86-100-100v-212c0-55.14 44.86-100 100-100h212c55.14 0 100 44.86 100 100zm-355.39-116.61 59.79-59.79c9.45-9.45 25.61-2.76 25.61 10.61v27.79h129c8.28 0 15 6.72 15 15v34c0 8.28-6.72 15-15 15h-129.01v27.79c0 13.36-16.16 20.06-25.61 10.61l-59.79-59.79c-5.86-5.86-5.86-15.36 0-21.21zm309.39-134.39v290c0 8.28-6.72 15-15 15h-98c-8.28 0-15-6.72-15-15v-34c0-8.28 6.72-15 15-15h49v-192h-49c-8.28 0-15-6.72-15-15v-34c0-8.28 6.72-15 15-15h98c8.28 0 15 6.72 15 15z" fill="url(#linear-gradient)" data-name="94"/>
              </g>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Drophead;
