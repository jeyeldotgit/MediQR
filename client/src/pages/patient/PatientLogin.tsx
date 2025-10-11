import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { simulateApiCall, setStoredUser } from "../../utils";
import type { LoginForm } from "../../types";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For Backend Implementation for functions that needs server actions etc. useEffects
  useEffect(() => {
    console.log("Patient Login page loaded");
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

    console.log("Login attempt:", formData.email);

    try {
      // Simulate API call
      const response = await simulateApiCall({
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: formData.email,
        role: "patient",
      });

      if (response.success && response.data) {
        setStoredUser(response.data);
        console.log("Login successful:", response.data);
        navigate("/patient/profile");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mediqr-accent-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-mediqr-text">
            Patient Login
          </h2>
          <p className="mt-2 text-center text-sm text-mediqr-text/70">
            Sign in to access your medical records
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-t-md focus:outline-none focus:ring-mediqr focus:border-mediqr focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-mediqr-accent placeholder-mediqr-text/50 text-mediqr-text rounded-b-md focus:outline-none focus:ring-mediqr focus:border-mediqr focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-mediqr-text/70">
              Don't have an account?{" "}
              <Link
                to="/patient/register"
                className="font-medium text-mediqr hover:text-mediqr-dark transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
