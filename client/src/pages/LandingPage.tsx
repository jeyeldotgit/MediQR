import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mediqr-accent-light to-mediqr-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-mediqr-dark">MediQr</h1>
            <div className="flex space-x-4">
              <Link
                to="/patient/login"
                className="text-mediqr hover:text-mediqr-dark font-medium"
              >
                Patient Login
              </Link>
              <Link
                to="/staff/login"
                className="text-mediqr hover:text-mediqr-dark font-medium"
              >
                Staff Login
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold text-mediqr-text mb-6">
            Digital Medical Records
          </h1>
          <p className="text-xl text-mediqr-text/80 mb-8 max-w-3xl mx-auto">
            Secure, accessible, and efficient medical record management through
            QR code technology. Patients can access their records instantly, and
            medical staff can quickly retrieve patient information.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/patient/register"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-mediqr hover:bg-mediqr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr"
            >
              Get Started as Patient
            </Link>
            <Link
              to="/staff/login"
              className="inline-flex items-center px-8 py-3 border border-mediqr text-base font-medium rounded-md text-mediqr bg-white hover:bg-mediqr-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr"
            >
              Staff Portal
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-mediqr-text mb-12">
            How it Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Patient Features */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-mediqr-accent-light">
              <h3 className="text-2xl font-bold text-mediqr-text mb-6 text-center">
                For Patients
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-mediqr-accent-light rounded-full flex items-center justify-center">
                      <span className="text-mediqr font-bold">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-mediqr-text">
                      Create Your Profile
                    </h4>
                    <p className="text-mediqr-text/80">
                      Register and fill out your medical information securely.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-mediqr-accent-light rounded-full flex items-center justify-center">
                      <span className="text-mediqr font-bold">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-mediqr-text">
                      Access Your Records
                    </h4>
                    <p className="text-mediqr-text/80">
                      View your complete medical history and records anytime.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-mediqr-accent-light rounded-full flex items-center justify-center">
                      <span className="text-mediqr font-bold">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-mediqr-text">
                      Get Your QR Code
                    </h4>
                    <p className="text-mediqr-text/80">
                      Generate a secure QR code for quick access to your
                      records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Features */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-mediqr-accent-light">
              <h3 className="text-2xl font-bold text-mediqr-text mb-6 text-center">
                For Medical Staff
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-mediqr-accent-light rounded-full flex items-center justify-center">
                      <span className="text-mediqr font-bold">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-mediqr-text">
                      Scan QR Code
                    </h4>
                    <p className="text-mediqr-text/80">
                      Use the camera to scan patient QR codes for instant
                      access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-mediqr-accent-light rounded-full flex items-center justify-center">
                      <span className="text-mediqr font-bold">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-mediqr-text">
                      View Patient Profile
                    </h4>
                    <p className="text-mediqr-text/80">
                      Access complete patient information and medical history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-mediqr-accent-light rounded-full flex items-center justify-center">
                      <span className="text-mediqr font-bold">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-mediqr-text">
                      Add New Records
                    </h4>
                    <p className="text-mediqr-text/80">
                      Create and update medical records efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-mediqr rounded-lg p-8 text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-mediqr-accent-light mb-8 text-lg">
            Join thousands of patients and medical professionals using MediQr
            for better healthcare management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/patient/register"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-mediqr bg-white hover:bg-mediqr-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Start as Patient
            </Link>
            <Link
              to="/staff/login"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-mediqr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
