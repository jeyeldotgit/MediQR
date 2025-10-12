import React from "react";

interface BackendImplementationNoticeProps {
  title?: string;
  description?: string;
  endpoints: string[];
  icon?: string;
  className?: string;
}

const BackendImplementationNotice: React.FC<
  BackendImplementationNoticeProps
> = ({
  title = "Backend Implementation Required",
  description = "The following backend endpoints need to be implemented:",
  endpoints,
  icon = "🔧",
  className = "",
}) => {
  return (
    <div className={`mt-8 p-4 bg-mediqr-accent-light rounded-lg ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-mediqr">{icon}</span>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-mediqr-text">{title}</h3>
          <div className="mt-2 text-sm text-mediqr-text/80">
            <p className="mb-2">{description}</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              {endpoints.map((endpoint, index) => (
                <li key={index}>
                  <code className="bg-mediqr-neutral px-1 py-0.5 rounded text-mediqr-text">
                    {endpoint}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendImplementationNotice;
