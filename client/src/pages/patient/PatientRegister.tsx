import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { simulateApiCall, setStoredUser } from "../../utils";
import type { RegisterForm } from "../../types";

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Patient Register page loaded");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    console.log("Registration attempt:", formData.email);

    try {
      // Simulate API call
      const response = await simulateApiCall({
        id: "1",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        role: "patient",
      });

      if (response.success && response.data) {
        setStoredUser(response.data);
        console.log("Registration successful:", response.data);
        navigate("/patient/profile");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mediqr-accent-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-mediqr-text">
            Patient Registration
          </h2>
          <p className="mt-2 text-center text-sm text-mediqr-text/70">
            Create your account to access medical services
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-mediqr-text"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-md focus:outline-none focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  value={formData.firstName}
                  onChange={handleInputChange}
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
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-md focus:outline-none focus:ring-mediqr focus:border-mediqr sm:text-sm"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-mediqr-text"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-md focus:outline-none focus:ring-mediqr focus:border-mediqr sm:text-sm"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-mediqr-text"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-md focus:outline-none focus:ring-mediqr focus:border-mediqr sm:text-sm"
                value={formData.phone}
                onChange={handleInputChange}
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
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-md focus:outline-none focus:ring-mediqr focus:border-mediqr sm:text-sm"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-mediqr-text"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-md focus:outline-none focus:ring-mediqr focus:border-mediqr sm:text-sm"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-mediqr-text"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-md focus:outline-none focus:ring-mediqr focus:border-mediqr sm:text-sm"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-mediqr-danger text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mediqr hover:bg-mediqr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediqr disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-mediqr-text/70">
              Already have an account?{" "}
              <Link
                to="/patient/login"
                className="font-medium text-mediqr hover:text-mediqr-dark transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
