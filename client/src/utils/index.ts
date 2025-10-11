// QR Code Utilities
export const generateQRCodeData = (patientId: string): string => {
  const timestamp = Date.now();
  const hash = btoa(`${patientId}-${timestamp}`);
  return JSON.stringify({
    patientId,
    timestamp,
    hash,
  });
};

export const parseQRCodeData = (qrData: string) => {
  try {
    return JSON.parse(qrData);
  } catch {
    return null;
  }
};

// API Simulation Utilities
export const simulateApiCall = async <T>(
  data: T,
  delay: number = 1000,
  shouldFail: boolean = false
): Promise<{ success: boolean; data?: T; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ success: false, error: "Simulated API error" });
      } else {
        resolve({ success: true, data });
      }
    }, delay);
  });
};

// Local Storage Utilities
export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem("user");
};

// Date Utilities
export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (date: string | Date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Validation Utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Mock Data Generators
export const generateMockPatient = (id: string = "1"): any => ({
  id,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  dateOfBirth: "1990-01-01",
  address: "123 Main St, City, State 12345",
  emergencyContact: {
    name: "Jane Doe",
    phone: "+1234567891",
    relationship: "Spouse",
  },
  medicalHistory: ["Hypertension", "Diabetes Type 2"],
  allergies: ["Penicillin", "Shellfish"],
  medications: ["Metformin", "Lisinopril"],
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
});

export const generateMockRecords = (patientId: string): any[] => [
  {
    id: "1",
    patientId,
    staffId: "staff1",
    date: "2024-01-15T10:00:00Z",
    type: "consultation",
    title: "Annual Checkup",
    description: "Routine annual health checkup",
    diagnosis: "Healthy",
    treatment: "Continue current medications",
    medications: ["Metformin", "Lisinopril"],
    notes: "Patient is doing well. Blood pressure under control.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    patientId,
    staffId: "staff1",
    date: "2024-01-10T14:30:00Z",
    type: "lab_result",
    title: "Blood Test Results",
    description: "Complete blood count and metabolic panel",
    diagnosis: "Normal values",
    treatment: "No treatment needed",
    notes: "All values within normal range",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
];
