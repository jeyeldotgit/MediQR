import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isPatientRoute = location.pathname.startsWith("/patient");
  const isStaffRoute = location.pathname.startsWith("/staff");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Current route:", location.pathname);
    console.log("Is patient route:", isPatientRoute);
    console.log("Is staff route:", isStaffRoute);
  }, [location.pathname, isPatientRoute, isStaffRoute]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-mediqr-neutral">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-mediqr-accent-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-mediqr-dark">MediQr</h1>
            </div>

            <div className="flex items-center space-x-4">
              {isPatientRoute && (
                <nav className="hidden md:flex space-x-8">
                  <button
                    onClick={() => navigate("/patient/profile")}
                    className="text-mediqr-text/70 hover:text-mediqr px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/patient/records")}
                    className="text-mediqr-text/70 hover:text-mediqr px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Records
                  </button>
                  <button
                    onClick={() => navigate("/patient/qr-code")}
                    className="text-mediqr-text/70 hover:text-mediqr px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My QR Code
                  </button>
                </nav>
              )}

              {isStaffRoute && (
                <nav className="hidden md:flex space-x-8">
                  <button
                    onClick={() => navigate("/staff/scanner")}
                    className="text-mediqr-text/70 hover:text-mediqr px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Scanner
                  </button>
                  <button
                    onClick={() => navigate("/staff/patients")}
                    className="text-mediqr-text/70 hover:text-mediqr px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Patients
                  </button>
                  <button
                    onClick={() => navigate("/staff/add-record")}
                    className="text-mediqr-text/70 hover:text-mediqr px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Add Record
                  </button>
                </nav>
              )}

              <button
                onClick={handleLogout}
                className="bg-mediqr-danger hover:bg-mediqr-danger/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
