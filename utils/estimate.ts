import { WizardFormData, EstimateResult } from '@/types';

export function computeEstimate(data: WizardFormData): EstimateResult {
  let taxaBase = 0;
  let carnes = 0;
  let consultoria = 0;
  let horaExtra = 0;
  let premium = 0;
  
  const observacoes: string[] = [];
  
  // Taxa base por duração e número de pessoas
  const duracao = data.duracao;
  const pessoas = data.numeroPessoas;
  
  // Lógica de taxa base (aumenta com pessoas e horas)
  if (pessoas <= 30) {
    taxaBase = duracao * 400;
  } else if (pessoas <= 60) {
    taxaBase = duracao * 550;
  } else if (pessoas <= 90) {
    taxaBase = duracao * 700;
  } else {
    taxaBase = duracao * 850;
  }
  
  // Hora extra (se duração > 4h base)
  if (data.extras.horaExtra || duracao > 4) {
    const horasExtras = Math.max(0, duracao - 4);
    horaExtra = horasExtras * 350;
    if (data.extras.horaExtra) {
      observacoes.push('Hora extra solicitada');
    }
  }
  
  // Carnes inclusas
  if (data.responsabilidadeCarnes === 'lipesteak-compra') {
    // Estimativa: R$ 60-80 por pessoa para carnes premium
    carnes = pessoas * 70;
    observacoes.push('Carnes inclusas com seleção LipeSteak');
  }
  
  // Consultoria
  if (
    data.responsabilidadeCarnes === 'consultoria' ||
    data.extras.consultoria
  ) {
    consultoria = 400;
    observacoes.push('Consultoria de compra incluída');
  }
  
  // Premium (cortes ou extras)
  if (data.planoCortes === 'premium' || data.extras.corteEspecial) {
    premium = pessoas * 15;
    observacoes.push('Seleção de cortes premium');
  }
  
  // Harmonização
  if (data.extras.harmonizacao) {
    observacoes.push('Sugestão de harmonização com bebidas');
  }
  
  // Cliente disponibiliza carnes - aviso
  if (data.responsabilidadeCarnes === 'cliente-disponibiliza') {
    observacoes.push('Preço pode variar conforme qualidade e quantidade das carnes fornecidas');
  }
  
  // Cálculo total
  const total = taxaBase + carnes + consultoria + horaExtra + premium;
  
  // Faixa de variação (±15%)
  const valorMinimo = Math.round(total * 0.85);
  const valorMaximo = Math.round(total * 1.15);
  
  observacoes.push('Valor final pode variar conforme local, cardápio e detalhes do evento');
  observacoes.push('Orçamento final será ajustado após conversa detalhada');
  
  return {
    valorMinimo,
    valorMaximo,
    observacoes,
    breakdown: {
      taxaBase,
      carnes: carnes > 0 ? carnes : undefined,
      consultoria: consultoria > 0 ? consultoria : undefined,
      horaExtra: horaExtra > 0 ? horaExtra : undefined,
      premium: premium > 0 ? premium : undefined,
    },
  };
}
