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
  let valorPorPessoa = 0;
  
  // Lógica de taxa base
  // Se cliente fornece a carne ou quer consultoria, cobra baseado na duração
  if (data.responsabilidadeCarnes === 'cliente-disponibiliza' || data.responsabilidadeCarnes === 'consultoria') {
    if (duracao <= 4) {
      valorPorPessoa = 25;
    } else if (duracao === 5) {
      valorPorPessoa = 30;
    } else { // 6 horas ou mais
      valorPorPessoa = 35;
    }
    taxaBase = pessoas * valorPorPessoa;
  } else {
    // Aumenta com pessoas e horas
    if (pessoas <= 30) {
      taxaBase = duracao * 400;
    } else if (pessoas <= 60) {
      taxaBase = duracao * 550;
    } else if (pessoas <= 90) {
      taxaBase = duracao * 700;
    } else {
      taxaBase = duracao * 850;
    }
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
    consultoria = 200;
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
  
  // Cliente disponibiliza carnes ou consultoria - aviso
  if (data.responsabilidadeCarnes === 'cliente-disponibiliza' || data.responsabilidadeCarnes === 'consultoria') {
    observacoes.push('Cobramos o valor fixo por pessoa de acordo com a quantidade de horas de evento. R$ 25,00 para 4 horas, R$ 30,00 para 5 horas e R$ 35,00 para 6 horas');
    observacoes.push('Preço pode variar conforme qualidade e quantidade das carnes fornecidas');
  }
  
  // Cálculo total
  const total = taxaBase + carnes + consultoria + horaExtra + premium;
  
  // Faixa de variação (±15%)
  const valorMinimo = Math.round(total * 0.85);
  const valorMaximo = Math.round(total * 1.15);
  
  observacoes.push('Valor final pode variar conforme local, cardápio e detalhes do evento');
  observacoes.push('Orçamento final será ajustado após conversa detalhada no whatsapp');
  
  return {
    valorMinimo,
    valorMaximo,
    observacoes,
    breakdown: {
      taxaBase,
      valorPorPessoa: valorPorPessoa > 0 ? valorPorPessoa : undefined,
      carnes: carnes > 0 ? carnes : undefined,
      consultoria: consultoria > 0 ? consultoria : undefined,
      horaExtra: horaExtra > 0 ? horaExtra : undefined,
      premium: premium > 0 ? premium : undefined,
    },
  };
}
