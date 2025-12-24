import { EstimateResult } from '@/types';
import Card from '../Card';

interface EstimateSummaryProps {
  estimate: EstimateResult;
}

export default function EstimateSummary({ estimate }: EstimateSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  return (
    <Card className="bg-charcoal text-off-white">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl mb-2">Estimativa do Seu Evento</h3>
        <div className="h-1 w-20 bg-gold mx-auto mb-4"></div>
        <p className="text-3xl md:text-4xl font-sans font-bold text-gold">
          {formatCurrency(estimate.valorMinimo)} – {formatCurrency(estimate.valorMaximo)}
        </p>
      </div>
      
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between py-2 border-b border-gold/20">
          <span className="text-off-white/80">Taxa Base</span>
          <span className="font-semibold">{formatCurrency(estimate.breakdown.taxaBase)}</span>
        </div>
        
        {estimate.breakdown.carnes && (
          <div className="flex justify-between py-2 border-b border-gold/20">
            <span className="text-off-white/80">Carnes Inclusas</span>
            <span className="font-semibold">{formatCurrency(estimate.breakdown.carnes)}</span>
          </div>
        )}
        
        {estimate.breakdown.consultoria && (
          <div className="flex justify-between py-2 border-b border-gold/20">
            <span className="text-off-white/80">Consultoria</span>
            <span className="font-semibold">{formatCurrency(estimate.breakdown.consultoria)}</span>
          </div>
        )}
        
        {estimate.breakdown.horaExtra && (
          <div className="flex justify-between py-2 border-b border-gold/20">
            <span className="text-off-white/80">Hora Extra</span>
            <span className="font-semibold">{formatCurrency(estimate.breakdown.horaExtra)}</span>
          </div>
        )}
        
        {estimate.breakdown.premium && (
          <div className="flex justify-between py-2 border-b border-gold/20">
            <span className="text-off-white/80">Seleção Premium</span>
            <span className="font-semibold">{formatCurrency(estimate.breakdown.premium)}</span>
          </div>
        )}
      </div>
      
      {estimate.observacoes.length > 0 && (
        <div className="bg-off-white/10 rounded p-4">
          <h4 className="font-sans font-semibold mb-2 text-sm">Observações:</h4>
          <ul className="space-y-1 text-sm text-off-white/80">
            {estimate.observacoes.map((obs, index) => (
              <li key={index}>• {obs}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
