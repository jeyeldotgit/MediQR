import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Patient } from "../../types";
import BackendImplementationNotice from "../../components/BackendImplementationNotice";

// Mock data for demonstration - will be replaced with API calls
const mockPatients: Patient[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0123",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, City, State 12345",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1-555-0124",
      relationship: "Spouse",
    },
    medicalHistory: ["Hypertension", "Diabetes Type 2"],
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Metformin", "Lisinopril"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarah.smith@email.com",
    phone: "+1-555-0125",
    dateOfBirth: "1985-08-22",
    address: "456 Oak Ave, City, State 12345",
    emergencyContact: {
      name: "Mike Smith",
      phone: "+1-555-0126",
      relationship: "Brother",
    },
    medicalHistory: ["Asthma", "Seasonal Allergies"],
    allergies: ["Pollen", "Dust"],
    medications: ["Albuterol", "Loratadine"],
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-22T11:20:00Z",
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@email.com",
    phone: "+1-555-0127",
    dateOfBirth: "1978-12-03",
    address: "789 Pine St, City, State 12345",
    emergencyContact: {
      name: "Lisa Johnson",
      phone: "+1-555-0128",
      relationship: "Wife",
    },
    medicalHistory: ["Heart Disease", "High Cholesterol"],
    allergies: ["Latex"],
    medications: ["Atorvastatin", "Aspirin"],
    createdAt: "2024-01-20T16:30:00Z",
    updatedAt: "2024-01-25T08:15:00Z",
  },
];

const StaffPatientsView = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "recent" | "active">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"name" | "date" | "lastVisit">("name");

  // For Backend Implementation - This will be replaced with actual API calls
  useEffect(() => {
    console.log("Staff Patients View page loaded");

    // TODO: Replace with actual API call
    // fetchPatients();

    // Simulate API call
    const loadPatients = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Replace with actual API call
        // const response = await fetch('/api/patients');
        // const data = await response.json();
        // setPatients(data.patients);

        // Mock data for now
        setPatients(mockPatients);
      } catch (error) {
        console.error("Error loading patients:", error);
        // TODO: Handle error state
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  // Filter and sort patients
  const filteredPatients = patients
    .filter((patient) => {
      const matchesSearch =
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm);

      if (filterStatus === "recent") {
        const visitDate = new Date(patient.updatedAt);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return matchesSearch && visitDate >= sevenDaysAgo;
      }

      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          );
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "lastVisit":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });

  const handlePatientClick = (patientId: string) => {
    navigate(`/staff/patient/${patientId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPatientStatus = (patient: Patient) => {
    const lastVisit = new Date(patient.updatedAt);
    const now = new Date();
    const daysSinceLastVisit = Math.floor(
      (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastVisit <= 1)
      return { status: "Active", color: "text-mediqr-success" };
    if (daysSinceLastVisit <= 7)
      return { status: "Recent", color: "text-mediqr-warning" };
    return { status: "Inactive", color: "text-mediqr-text/60" };
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg border border-mediqr-accent-light">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mediqr"></div>
            </div>
            <p className="text-center text-mediqr-text/70 mt-4">
              Loading patients...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow rounded-lg border border-mediqr-accent-light">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-mediqr-text mb-4 sm:mb-0">
              Patient Database
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-mediqr-text/70">
                {filteredPatients.length} of {patients.length} patients
              </span>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-mediqr-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-mediqr focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as "all" | "recent" | "active")
                }
                className="px-3 py-2 border border-mediqr-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-mediqr focus:border-transparent"
              >
                <option value="all">All Patients</option>
                <option value="recent">Recent Visits</option>
                <option value="active">Active</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "name" | "date" | "lastVisit")
                }
                className="px-3 py-2 border border-mediqr-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-mediqr focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Registration</option>
                <option value="lastVisit">Sort by Last Visit</option>
              </select>
            </div>
          </div>

          {/* Patients List */}
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-mediqr-text mb-2">
                No patients found
              </h3>
              <p className="text-mediqr-text/70">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No patients have been registered yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPatients.map((patient) => {
                const status = getPatientStatus(patient);
                return (
                  <div
                    key={patient.id}
                    onClick={() => handlePatientClick(patient.id)}
                    className="bg-mediqr-neutral rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow border border-mediqr-accent-light hover:border-mediqr-accent"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-mediqr-text">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-mediqr-text/70">
                          {patient.email}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${status.color} bg-mediqr-accent-light`}
                      >
                        {status.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-mediqr-text/60 w-20">Phone:</span>
                        <span className="text-mediqr-text">
                          {patient.phone}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-mediqr-text/60 w-20">DOB:</span>
                        <span className="text-mediqr-text">
                          {new Date(patient.dateOfBirth).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-mediqr-text/60 w-20">
                          Last Visit:
                        </span>
                        <span className="text-mediqr-text">
                          {formatDate(patient.updatedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-mediqr-accent-light">
                      <div className="flex flex-wrap gap-1">
                        {patient.medicalHistory
                          .slice(0, 2)
                          .map((condition, index) => (
                            <span
                              key={index}
                              className="text-xs bg-mediqr-warning/20 text-mediqr-warning px-2 py-1 rounded"
                            >
                              {condition}
                            </span>
                          ))}
                        {patient.medicalHistory.length > 2 && (
                          <span className="text-xs text-mediqr-text/60">
                            +{patient.medicalHistory.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-mediqr-text/60">
                        ID: {patient.id}
                      </span>
                      <span className="text-mediqr text-sm font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Backend Implementation Notice */}
          <BackendImplementationNotice
            endpoints={[
              "GET /api/patients - Fetch all patients with pagination",
              "GET /api/patients/search - Search patients by name, email, phone",
              "GET /api/patients/filter - Filter patients by status, date range",
              "GET /api/patients/:id/visits - Get patient visit history",
              "POST /api/patients/scan - Log patient scan/visit",
              "GET /api/patients/stats - Get patient statistics and counts",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffPatientsView;
