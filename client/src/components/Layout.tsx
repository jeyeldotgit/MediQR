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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">MediQr</h1>
            </div>

            <div className="flex items-center space-x-4">
              {isPatientRoute && (
                <nav className="hidden md:flex space-x-8">
                  <button
                    onClick={() => navigate("/patient/profile")}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/patient/records")}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Records
                  </button>
                  <button
                    onClick={() => navigate("/patient/qr-code")}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My QR Code
                  </button>
                </nav>
              )}

              {isStaffRoute && (
                <nav className="hidden md:flex space-x-8">
                  <button
                    onClick={() => navigate("/staff/scanner")}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Scanner
                  </button>
                  <button
                    onClick={() => navigate("/staff/add-record")}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Add Record
                  </button>
                </nav>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
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
