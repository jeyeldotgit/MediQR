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
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            QR Code Scanner
          </h1>

          <div className="text-center">
            {/* Camera Preview Area */}
            <div className="bg-gray-100 rounded-lg p-8 mb-6">
              <div className="inline-block bg-white p-4 rounded-lg shadow-sm">
                <div className="w-80 h-60 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  {scanning ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                      <div className="text-sm text-gray-600">Scanning...</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-4">📷</div>
                      <div className="text-sm text-gray-500">
                        Camera Preview
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {message && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800 text-sm">{message}</div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-800 text-sm">{error}</div>
              </div>
            )}

            {/* Scanned Data Display */}
            {scannedData && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Scanned Data:
                </h3>
                <code className="text-xs text-gray-600 break-all">
                  {scannedData}
                </code>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!scanning ? (
                <button
                  onClick={startScanning}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  📷 Start Scanning
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  ⏹️ Stop Scanning
                </button>
              )}

              <button
                onClick={handleManualEntry}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ⌨️ Manual Entry
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-left bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-4">
                How to scan:
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">1.</span>
                  <span>Click "Start Scanning" to activate the camera</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">2.</span>
                  <span>Point the camera at the patient's QR code</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">3.</span>
                  <span>Wait for the QR code to be detected and processed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">4.</span>
                  <span>
                    You'll be automatically redirected to the patient's profile
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">5.</span>
                  <span>
                    Use "Manual Entry" if QR scanning is not available
                  </span>
                </li>
              </ul>
            </div>

            {/* Demo Notice */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">ℹ️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Demo Mode
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
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
