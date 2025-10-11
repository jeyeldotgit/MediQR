import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  simulateApiCall,
  generateMockPatient,
  generateMockRecords,
  formatDateTime,
} from "../../utils";
import type { Patient, MedicalRecord } from "../../types";

const StaffPatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "records">("profile");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Staff Patient Profile page loaded for patient:", id);
    loadPatientData();
  }, [id]);

  const loadPatientData = async () => {
    setLoading(true);
    try {
      // Simulate loading patient data
      const patientResponse = await simulateApiCall(generateMockPatient(id));
      const recordsResponse = await simulateApiCall(
        generateMockRecords(id || "1")
      );

      if (patientResponse.success && patientResponse.data) {
        setPatient(patientResponse.data);
        console.log("Patient loaded:", patientResponse.data);
      }

      if (recordsResponse.success && recordsResponse.data) {
        setRecords(recordsResponse.data);
        console.log("Records loaded:", recordsResponse.data);
      }
    } catch (err) {
      console.error("Error loading patient data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRecordTypeColor = (type: string) => {
    const colors = {
      consultation: "bg-blue-100 text-blue-800",
      prescription: "bg-green-100 text-green-800",
      lab_result: "bg-yellow-100 text-yellow-800",
      procedure: "bg-purple-100 text-purple-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const getRecordTypeLabel = (type: string) => {
    const labels = {
      consultation: "Consultation",
      prescription: "Prescription",
      lab_result: "Lab Result",
      procedure: "Procedure",
      other: "Other",
    };
    return labels[type as keyof typeof labels] || "Other";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading patient data...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Patient not found</div>
        <button
          onClick={() => navigate("/staff/scanner")}
          className="mt-4 text-indigo-600 hover:text-indigo-500"
        >
          ← Back to Scanner
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Patient Header */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h1>
              <p className="text-gray-600">Patient ID: {patient.id}</p>
              <p className="text-sm text-gray-500">
                DOB: {new Date(patient.dateOfBirth).toLocaleDateString()} |
                Phone: {patient.phone} | Email: {patient.email}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/staff/add-record")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                ➕ Add Record
              </button>
              <button
                onClick={() => navigate("/staff/scanner")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                🔍 Scan Another
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Patient Profile
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "records"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Medical Records ({records.length})
            </button>
          </nav>
        </div>

        <div className="px-6 py-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {patient.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {patient.email}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {patient.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {patient.emergencyContact.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {patient.emergencyContact.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Relationship
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {patient.emergencyContact.relationship}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Medical Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Medical History
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {patient.medicalHistory.map((condition, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Allergies
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current Medications
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {patient.medications.map((medication, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {medication}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div className="space-y-4">
              {records.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    No medical records found
                  </div>
                  <button
                    onClick={() => navigate("/staff/add-record")}
                    className="mt-4 text-indigo-600 hover:text-indigo-500"
                  >
                    Add first record
                  </button>
                </div>
              ) : (
                records.map((record) => (
                  <div
                    key={record.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {record.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {record.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRecordTypeColor(
                            record.type
                          )}`}
                        >
                          {getRecordTypeLabel(record.type)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDateTime(record.date)}
                        </span>
                      </div>
                    </div>

                    {record.diagnosis && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Diagnosis:
                        </h4>
                        <p className="text-sm text-gray-600">
                          {record.diagnosis}
                        </p>
                      </div>
                    )}

                    {record.treatment && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Treatment:
                        </h4>
                        <p className="text-sm text-gray-600">
                          {record.treatment}
                        </p>
                      </div>
                    )}

                    {record.medications && record.medications.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Medications:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {record.medications.map((med, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800"
                            >
                              {med}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {record.notes && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Notes:
                        </h4>
                        <p className="text-sm text-gray-600">{record.notes}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffPatientProfile;
