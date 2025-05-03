
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProcessingScreenProps {
  currentStep: number;
}

const ProcessingScreen = ({ currentStep }: ProcessingScreenProps) => {
  const steps = [
    { id: 1, name: "Company Research" },
    { id: 2, name: "Resume Customization" },
    { id: 3, name: "Resume Review" },
    { id: 4, name: "Cover Letter Creation" },
    { id: 5, name: "Cover Letter Review" },
    { id: 6, name: "Finalizing Results" },
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Processing Your Request
        </h2>
        <p className="text-gray-600">
          Our AI agents are working to optimize your resume and cover letter
        </p>
      </div>

      <div className="mb-6">
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-sm text-gray-500 mt-2 text-right">
          {Math.round(progressPercentage)}% Complete
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`flex items-center p-4 rounded-lg border ${
                isActive
                  ? "border-primary bg-primary/5"
                  : isCompleted
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              } transition-all`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  isActive
                    ? "bg-primary/20 text-primary animate-pulse-soft"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div>
                <p
                  className={`font-medium ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.name}
                </p>
                {isActive && (
                  <p className="text-sm text-primary/70 animate-pulse-soft">
                    Processing...
                  </p>
                )}
                {isCompleted && (
                  <p className="text-sm text-green-600">Completed</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingScreen;
