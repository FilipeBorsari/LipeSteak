interface StepperProps {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="hidden md:flex items-center justify-between mb-12">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gold text-charcoal ring-4 ring-gold/20'
                    : isCompleted
                    ? 'bg-charcoal text-off-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span
                className={`mt-2 text-xs font-sans text-center max-w-[100px] ${
                  isActive ? 'text-charcoal font-semibold' : 'text-gray-600'
                }`}
              >
                {step}
              </span>
            </div>
            
            {stepNumber < steps.length && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-200 ${
                  isCompleted ? 'bg-charcoal' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
