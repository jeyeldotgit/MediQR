import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { parseQRCodeData, simulateApiCall } from "../../utils";

const StaffScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Staff Scanner page loaded");
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    setScanning(true);
    setError("");
    setMessage("");

    try {
      // In a real app, you would use a camera API here
      // For demo purposes, we'll simulate the camera
      console.log("Starting camera...");
      setMessage("Camera started. Point at QR code to scan.");

      // Simulate scanning after 3 seconds
      setTimeout(() => {
        simulateQRScan();
      }, 3000);
    } catch (err) {
      setError("Failed to access camera");
      console.error("Camera error:", err);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    setScanning(false);
    setMessage("");
    console.log("Stopping camera...");
  };

  const simulateQRScan = () => {
    // Simulate scanning a QR code
    const mockQRData = JSON.stringify({
      patientId: "1",
      timestamp: Date.now(),
      hash: "mock-hash-123",
    });

    setScannedData(mockQRData);
    setMessage("QR Code detected! Processing...");

    setTimeout(() => {
      handleQRCodeData(mockQRData);
    }, 1000);
  };

  const handleQRCodeData = async (qrData: string) => {
    try {
      const parsedData = parseQRCodeData(qrData);

      if (!parsedData || !parsedData.patientId) {
        setError("Invalid QR code format");
        return;
      }

      console.log("QR Code data:", parsedData);

      // Simulate API call to verify patient
      const response = await simulateApiCall({
        patientId: parsedData.patientId,
        verified: true,
        patientName: "John Doe",
      });

      if (response.success) {
        setMessage("Patient verified successfully!");
        console.log("Patient verified:", response.data);

        // Navigate to patient profile after a short delay
        setTimeout(() => {
          navigate(`/staff/patient/${parsedData.patientId}`);
        }, 1500);
      } else {
        setError("Failed to verify patient");
      }
    } catch (err) {
      setError("Error processing QR code");
      console.error("QR processing error:", err);
    }
  };

  const handleManualEntry = () => {
    const patientId = prompt("Enter Patient ID:");
    if (patientId) {
      navigate(`/staff/patient/${patientId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg border border-mediqr-accent-light">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-mediqr-text mb-6">
            QR Code Scanner
          </h1>

          <div className="text-center">
            {/* Camera Preview Area */}
            <div className="bg-mediqr-accent-light rounded-lg p-8 mb-6">
              <div className="inline-block bg-white p-4 rounded-lg shadow-sm border border-mediqr-accent-light">
                <div className="w-80 h-60 bg-mediqr-neutral rounded-lg flex items-center justify-center border-2 border-dashed border-mediqr-accent">
                  {scanning ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mediqr mx-auto mb-4"></div>
                      <div className="text-sm text-mediqr-text/70">
                        Scanning...
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-4">📷</div>
                      <div className="text-sm text-mediqr-text/70">
                        Camera Preview
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {message && (
              <div className="mb-4 p-4 bg-mediqr-success/20 border border-mediqr-success/30 rounded-lg">
                <div className="text-mediqr-success text-sm">{message}</div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-mediqr-danger/20 border border-mediqr-danger/30 rounded-lg">
                <div className="text-mediqr-danger text-sm">{error}</div>
              </div>
            )}

            {/* Scanned Data Display */}
            {scannedData && (
              <div className="mb-6 p-4 bg-mediqr-neutral rounded-lg">
                <h3 className="text-sm font-medium text-mediqr-text mb-2">
                  Scanned Data:
                </h3>
                <code className="text-xs text-mediqr-text/70 break-all">
                  {scannedData}
                </code>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!scanning ? (
                <button
                  onClick={startScanning}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-mediqr hover:bg-mediqr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr transition-colors"
                >
                  📷 Start Scanning
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-mediqr-danger hover:bg-mediqr-danger/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr-danger transition-colors"
                >
                  ⏹️ Stop Scanning
                </button>
              )}

              <button
                onClick={handleManualEntry}
                className="inline-flex items-center px-6 py-3 border border-mediqr-accent text-base font-medium rounded-md text-mediqr bg-white hover:bg-mediqr-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr transition-colors"
              >
                ⌨️ Manual Entry
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-left bg-mediqr-accent-light rounded-lg p-6">
              <h3 className="text-lg font-medium text-mediqr-text mb-4">
                How to scan:
              </h3>
              <ul className="space-y-2 text-sm text-mediqr-text/80">
                <li className="flex items-start">
                  <span className="text-mediqr mr-2">1.</span>
                  <span>Click "Start Scanning" to activate the camera</span>
                </li>
                <li className="flex items-start">
                  <span className="text-mediqr mr-2">2.</span>
                  <span>Point the camera at the patient's QR code</span>
                </li>
                <li className="flex items-start">
                  <span className="text-mediqr mr-2">3.</span>
                  <span>Wait for the QR code to be detected and processed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-mediqr mr-2">4.</span>
                  <span>
                    You'll be automatically redirected to the patient's profile
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-mediqr mr-2">5.</span>
                  <span>
                    Use "Manual Entry" if QR scanning is not available
                  </span>
                </li>
              </ul>
            </div>

            {/* Demo Notice */}
            <div className="mt-6 p-4 bg-mediqr-warning/10 border border-mediqr-warning/20 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-mediqr-warning">ℹ️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-mediqr-warning">
                    Demo Mode
                  </h3>
                  <div className="mt-2 text-sm text-mediqr-warning/80">
                    <p>
                      This is a demo version. The camera functionality is
                      simulated. In a real application, this would use the
                      device's camera to scan actual QR codes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffScanner;
