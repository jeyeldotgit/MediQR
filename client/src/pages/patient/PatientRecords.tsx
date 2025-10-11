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
      consultation: "bg-mediqr-accent-light text-mediqr",
      prescription: "bg-mediqr-success/20 text-mediqr-success",
      lab_result: "bg-mediqr-warning/20 text-mediqr-warning",
      procedure: "bg-mediqr-accent/20 text-mediqr-accent",
      other: "bg-mediqr-neutral text-mediqr-text",
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
        <div className="text-lg text-mediqr-text">Loading records...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg border border-mediqr-accent-light">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-mediqr-text">
              My Medical Records
            </h1>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="filter"
                className="text-sm font-medium text-mediqr-text"
              >
                Filter by type:
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
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
              <div className="text-mediqr-text/70 text-lg">
                No records found
              </div>
              <div className="text-mediqr-text/50 text-sm mt-2">
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
                  className="border border-mediqr-accent-light rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-mediqr-text">
                        {record.title}
                      </h3>
                      <p className="text-sm text-mediqr-text/70">
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
                      <span className="text-sm text-mediqr-text/60">
                        {formatDateTime(record.date)}
                      </span>
                    </div>
                  </div>

                  {record.diagnosis && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-mediqr-text">
                        Diagnosis:
                      </h4>
                      <p className="text-sm text-mediqr-text/70">
                        {record.diagnosis}
                      </p>
                    </div>
                  )}

                  {record.treatment && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-mediqr-text">
                        Treatment:
                      </h4>
                      <p className="text-sm text-mediqr-text/70">
                        {record.treatment}
                      </p>
                    </div>
                  )}

                  {record.medications && record.medications.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-mediqr-text">
                        Medications:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {record.medications.map((med, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-mediqr-success/20 text-mediqr-success"
                          >
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.notes && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-mediqr-text">
                        Notes:
                      </h4>
                      <p className="text-sm text-mediqr-text/70">
                        {record.notes}
                      </p>
                    </div>
                  )}

                  {record.attachments && record.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-mediqr-text">
                        Attachments:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {record.attachments.map((attachment, index) => (
                          <a
                            key={index}
                            href="#"
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-mediqr-neutral text-mediqr-text hover:bg-mediqr-accent-light transition-colors"
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
