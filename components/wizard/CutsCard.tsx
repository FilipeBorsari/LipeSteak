import Image from 'next/image';
import Card from '../Card';

interface CutsCardProps {
  value: string;
  label: string;
  description: string;
  imageSrc: string;
  selected: boolean;
  onSelect: () => void;
}

export default function CutsCard({
  value,
  label,
  description,
  imageSrc,
  selected,
  onSelect,
}: CutsCardProps) {
  return (
    <Card selected={selected} onClick={onSelect} className="text-left">
      <div className="relative w-full h-32 mb-4 rounded overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={label}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">{label}</h3>
      <p className="font-sans text-sm text-gray-600">{description}</p>
    </Card>
  );
}
