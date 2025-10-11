import { useState, useEffect } from "react";
import { generateQRCodeData, getStoredUser } from "../../utils";

const PatientQRCode = () => {
  const [qrData, setQrData] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("1");
  const [loading, setLoading] = useState(true);

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Patient QR Code page loaded");
    generateQR();
  }, []);

  const generateQR = async () => {
    setLoading(true);
    try {
      // Get patient ID from stored user or use default
      const user = getStoredUser();
      const currentPatientId = user?.id || patientId;

      // Generate QR code data
      const qrCodeData = generateQRCodeData(currentPatientId);
      setQrData(qrCodeData);
      setPatientId(currentPatientId);

      console.log("QR Code generated for patient:", currentPatientId);
      console.log("QR Data:", qrCodeData);
    } catch (err) {
      console.error("Error generating QR code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a QR code image
    console.log("Downloading QR code...");
    alert("QR code download functionality would be implemented here");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Generating QR code...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              My QR Code
            </h1>
            <p className="text-gray-600 mb-8">
              Show this QR code to medical staff for quick access to your
              records
            </p>

            {/* QR Code Display */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <div className="inline-block bg-white p-4 rounded-lg shadow-sm">
                {/* Placeholder QR Code - In a real app, you'd use a QR code library */}
                <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <div className="text-sm text-gray-500">
                      QR Code Placeholder
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Patient ID: {patientId}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Data (for debugging) */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                QR Code Data:
              </h3>
              <code className="text-xs text-gray-600 break-all">{qrData}</code>
            </div>

            {/* Instructions */}
            <div className="text-left bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-blue-900 mb-4">
                How to use your QR Code:
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">1.</span>
                  <span>
                    Present this QR code to medical staff when visiting
                    healthcare facilities
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">2.</span>
                  <span>
                    Staff can scan the code to quickly access your medical
                    records
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">3.</span>
                  <span>
                    Keep this QR code secure and don't share it with
                    unauthorized persons
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">4.</span>
                  <span>
                    You can print this page or save the QR code to your phone
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                🖨️ Print QR Code
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                📥 Download QR Code
              </button>
              <button
                onClick={generateQR}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                🔄 Regenerate QR Code
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Security Notice
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      This QR code contains sensitive medical information. Only
                      share it with authorized medical professionals. If you
                      suspect unauthorized access, regenerate your QR code
                      immediately.
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

export default PatientQRCode;
