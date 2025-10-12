import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { simulateApiCall } from "../../utils";
import type { MedicalRecord } from "../../types";
import BackendImplementationNotice from "../../components/BackendImplementationNotice";

const StaffAddRecord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<MedicalRecord>>({
    type: "consultation",
    title: "",
    description: "",
    diagnosis: "",
    treatment: "",
    medications: [],
    notes: "",
  });
  const [medicationInput, setMedicationInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Staff Add Record page loaded");
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMedicationAdd = () => {
    if (medicationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        medications: [...(prev.medications || []), medicationInput.trim()],
      }));
      setMedicationInput("");
    }
  };

  const handleMedicationRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const recordData = {
      ...formData,
      id: `record_${Date.now()}`,
      patientId: "1", // In a real app, this would come from context or params
      staffId: "staff1", // In a real app, this would come from logged-in staff
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Creating record:", recordData);

    try {
      // Simulate API call
      const response = await simulateApiCall({
        success: true,
        recordId: recordData.id,
      });

      if (response.success) {
        setMessage("Medical record created successfully!");
        console.log("Record created successfully");

        // Reset form
        setFormData({
          type: "consultation",
          title: "",
          description: "",
          diagnosis: "",
          treatment: "",
          medications: [],
          notes: "",
        });

        // Navigate back after a short delay
        setTimeout(() => {
          navigate("/staff/scanner");
        }, 2000);
      } else {
        setMessage("Failed to create record");
      }
    } catch (err) {
      setMessage("Error creating record");
      console.error("Error creating record:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg border border-mediqr-accent-light">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-mediqr-text">
              Add Medical Record
            </h1>
            <button
              onClick={() => navigate("/staff/scanner")}
              className="text-mediqr-text/70 hover:text-mediqr transition-colors"
            >
              ← Back to Scanner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Record Type and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  Record Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                >
                  <option value="consultation">Consultation</option>
                  <option value="prescription">Prescription</option>
                  <option value="lab_result">Lab Result</option>
                  <option value="procedure">Procedure</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  placeholder="e.g., Annual Checkup"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-mediqr-text"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                placeholder="Brief description of the visit or procedure"
              />
            </div>

            {/* Medical Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="diagnosis"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  Diagnosis
                </label>
                <input
                  type="text"
                  name="diagnosis"
                  id="diagnosis"
                  value={formData.diagnosis || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  placeholder="e.g., Hypertension"
                />
              </div>
              <div>
                <label
                  htmlFor="treatment"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  Treatment
                </label>
                <input
                  type="text"
                  name="treatment"
                  id="treatment"
                  value={formData.treatment || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  placeholder="e.g., Medication adjustment"
                />
              </div>
            </div>

            {/* Medications */}
            <div>
              <label className="block text-sm font-medium text-mediqr-text mb-2">
                Medications
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={medicationInput}
                  onChange={(e) => setMedicationInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleMedicationAdd())
                  }
                  className="flex-1 border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  placeholder="Enter medication name"
                />
                <button
                  type="button"
                  onClick={handleMedicationAdd}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mediqr hover:bg-mediqr-dark transition-colors"
                >
                  Add
                </button>
              </div>
              {formData.medications && formData.medications.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.medications.map((med, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-mediqr-success/20 text-mediqr-success"
                    >
                      {med}
                      <button
                        type="button"
                        onClick={() => handleMedicationRemove(index)}
                        className="ml-2 text-mediqr-success hover:text-mediqr-success/80 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-mediqr-text"
              >
                Additional Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                rows={4}
                value={formData.notes || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
                placeholder="Any additional notes or observations"
              />
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

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/staff/scanner")}
                className="px-4 py-2 border border-mediqr-accent text-sm font-medium rounded-md text-mediqr bg-white hover:bg-mediqr-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-mediqr hover:bg-mediqr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr disabled:opacity-50 transition-colors"
              >
                {loading ? "Creating..." : "Create Record"}
              </button>
            </div>
          </form>

          {/* Backend Implementation Notice */}
          <BackendImplementationNotice
            title="Medical Records Backend Required"
            description="The following backend endpoints need to be implemented for medical record management:"
            endpoints={[
              "POST /api/medical-records - Create new medical record",
              "GET /api/medical-records/:patientId - Get patient's medical records",
              "PUT /api/medical-records/:id - Update medical record",
              "DELETE /api/medical-records/:id - Delete medical record",
              "GET /api/medical-records/search - Search records by patient, type, date",
              "POST /api/medical-records/:id/attachments - Upload file attachments",
              "GET /api/medical-records/stats - Get record statistics and analytics",
            ]}
            icon="📋"
          />
        </div>
      </div>
    </div>
  );
};

export default StaffAddRecord;
