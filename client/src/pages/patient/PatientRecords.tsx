import { useState, useEffect } from "react";
import {
  simulateApiCall,
  generateMockRecords,
  formatDateTime,
} from "../../utils";
import type { MedicalRecord } from "../../types";

const PatientRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Patient Records page loaded");
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    try {
      // Simulate loading records
      const response = await simulateApiCall(generateMockRecords("1"));
      if (response.success && response.data) {
        setRecords(response.data);
        console.log("Records loaded:", response.data);
      }
    } catch (err) {
      console.error("Error loading records:", err);
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

  const filteredRecords = records.filter(
    (record) => filter === "all" || record.type === filter
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading records...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              My Medical Records
            </h1>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="filter"
                className="text-sm font-medium text-gray-700"
              >
                Filter by type:
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Records</option>
                <option value="consultation">Consultations</option>
                <option value="prescription">Prescriptions</option>
                <option value="lab_result">Lab Results</option>
                <option value="procedure">Procedures</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No records found</div>
              <div className="text-gray-400 text-sm mt-2">
                {filter === "all"
                  ? "You don't have any medical records yet."
                  : `No ${getRecordTypeLabel(
                      filter
                    ).toLowerCase()} records found.`}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
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

                  {record.attachments && record.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        Attachments:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {record.attachments.map((attachment, index) => (
                          <a
                            key={index}
                            href="#"
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                          >
                            📎 {attachment}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
