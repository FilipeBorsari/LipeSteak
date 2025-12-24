interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function Progress({ currentStep, totalSteps }: ProgressProps) {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-sans text-charcoal">
          Passo {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-sans text-charcoal font-medium">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
