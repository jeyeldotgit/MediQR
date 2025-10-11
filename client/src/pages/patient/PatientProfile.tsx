import { useState, useEffect } from "react";
import {
  getStoredUser,
  simulateApiCall,
  generateMockPatient,
} from "../../utils";
import type { ProfileForm } from "../../types";

const PatientProfile = () => {
  const [formData, setFormData] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
    medicalHistory: [],
    allergies: [],
    medications: [],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Patient Profile page loaded");
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // Simulate loading profile data
      const response = await simulateApiCall(generateMockPatient());
      if (response.success && response.data) {
        setFormData(response.data);
        console.log("Profile loaded:", response.data);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value,
      },
    }));
  };

  const handleArrayFieldChange = (
    field: keyof Pick<
      ProfileForm,
      "medicalHistory" | "allergies" | "medications"
    >,
    value: string
  ) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData((prev) => ({
      ...prev,
      [field]: items,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    console.log("Saving profile:", formData);

    try {
      // Simulate API call
      const response = await simulateApiCall({ success: true });
      if (response.success) {
        setMessage("Profile updated successfully!");
        console.log("Profile saved successfully");
      } else {
        setMessage("Failed to update profile");
      }
    } catch (err) {
      setMessage("Error updating profile");
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-mediqr-text">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg border border-mediqr-accent-light">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-mediqr-text mb-6">
            My Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-mediqr-accent-light pb-6">
              <h2 className="text-lg font-medium text-mediqr-text mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border-b border-mediqr-accent-light pb-6">
              <h2 className="text-lg font-medium text-mediqr-text mb-4">
                Emergency Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="emergencyName"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="emergencyName"
                    value={formData.emergencyContact.name}
                    onChange={handleEmergencyContactChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyPhone"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="emergencyPhone"
                    value={formData.emergencyContact.phone}
                    onChange={handleEmergencyContactChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emergencyRelationship"
                    className="block text-sm font-medium text-mediqr-text"
                  >
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    id="emergencyRelationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleEmergencyContactChange}
                    className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-mediqr-text">
                Medical Information
              </h2>

              <div>
                <label
                  htmlFor="medicalHistory"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  Medical History (comma-separated)
                </label>
                <input
                  type="text"
                  id="medicalHistory"
                  value={formData.medicalHistory.join(", ")}
                  onChange={(e) =>
                    handleArrayFieldChange("medicalHistory", e.target.value)
                  }
                  className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  placeholder="e.g., Hypertension, Diabetes"
                />
              </div>

              <div>
                <label
                  htmlFor="allergies"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  Allergies (comma-separated)
                </label>
                <input
                  type="text"
                  id="allergies"
                  value={formData.allergies.join(", ")}
                  onChange={(e) =>
                    handleArrayFieldChange("allergies", e.target.value)
                  }
                  className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  placeholder="e.g., Penicillin, Shellfish"
                />
              </div>

              <div>
                <label
                  htmlFor="medications"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  Current Medications (comma-separated)
                </label>
                <input
                  type="text"
                  id="medications"
                  value={formData.medications.join(", ")}
                  onChange={(e) =>
                    handleArrayFieldChange("medications", e.target.value)
                  }
                  className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  placeholder="e.g., Metformin, Lisinopril"
                />
              </div>
            </div>

            {message && (
              <div
                className={`text-sm ${
                  message.includes("success")
                    ? "text-mediqr-success"
                    : "text-mediqr-danger"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mediqr hover:bg-mediqr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr disabled:opacity-50 transition-colors"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
