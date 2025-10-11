// Patient Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
  createdAt: string;
  updatedAt: string;
}

// Staff Types
export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "doctor" | "nurse" | "admin";
  department: string;
  employeeId: string;
  createdAt: string;
}

// Medical Record Types
export interface MedicalRecord {
  id: string;
  patientId: string;
  staffId: string;
  date: string;
  type: "consultation" | "prescription" | "lab_result" | "procedure" | "other";
  title: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  notes: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

// QR Code Types
export interface QRCodeData {
  patientId: string;
  timestamp: number;
  hash: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
}
