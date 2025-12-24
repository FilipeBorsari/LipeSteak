// Tipos de eventos
export type EventType = 
  | 'aniversario'
  | 'cha-revelacao'
  | 'casamento'
  | 'confraternizacao'
  | 'outro';

// Opções de responsabilidade pelas carnes
export type MeatResponsibility = 
  | 'cliente-disponibiliza'
  | 'lipesteak-compra'
  | 'consultoria';

// Planos de cortes
export type CutsPlan = 
  | 'premium'
  | 'standard'
  | 'misto'
  | 'personalizado';

// Ponto da carne
export type MeatDoneness = 
  | 'mal-passada'
  | 'ao-ponto'
  | 'bem-passada'
  | 'misto';

// Item personalizado de corte
export interface CustomCutItem {
  id: string;
  type: string;
  quantity: number;
  unit: 'kg' | 'unidades';
}

// Extras disponíveis
export interface ExtraOptions {
  horaExtra: boolean;
  corteEspecial: boolean;
  consultoria: boolean;
  harmonizacao: boolean;
}

// Informações do lead
export interface LeadInfo {
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
}

// Dados do formulário completo
export interface WizardFormData {
  // Passo 1
  tipoEvento: EventType;
  dataEvento?: string;
  cidade: string;
  
  // Passo 2
  numeroPessoas: number;
  
  // Passo 3
  duracao: number; // em horas
  
  // Passo 4
  responsabilidadeCarnes: MeatResponsibility;
  carnesDisponibilizadas?: string; // textarea se cliente disponibiliza
  
  // Passo 5
  planoCortes: CutsPlan;
  cortesPersonalizados?: CustomCutItem[];
  pontoCarne: MeatDoneness;
  
  // Passo 6
  extras: ExtraOptions;
  contato: LeadInfo;
}

// Resultado da estimativa
export interface EstimateResult {
  valorMinimo: number;
  valorMaximo: number;
  observacoes: string[];
  breakdown: {
    taxaBase: number;
    carnes?: number;
    consultoria?: number;
    horaExtra?: number;
    premium?: number;
  };
}

// Constantes
export const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: 'aniversario', label: 'Aniversário' },
  { value: 'cha-revelacao', label: 'Chá Revelação' },
  { value: 'casamento', label: 'Casamento' },
  { value: 'confraternizacao', label: 'Confraternização' },
  { value: 'outro', label: 'Outro' },
];

export const MEAT_RESPONSIBILITY_OPTIONS: { 
  value: MeatResponsibility; 
  label: string; 
  description: string;
}[] = [
  {
    value: 'cliente-disponibiliza',
    label: 'Eu vou disponibilizar as carnes',
    description: 'Você compra e prepara as carnes, nós cuidamos do churrasco'
  },
  {
    value: 'lipesteak-compra',
    label: 'Quero carnes inclusas (LipeSteak)',
    description: 'Seleção de cortes premium + logística + padrão LipeSteak'
  },
  {
    value: 'consultoria',
    label: 'Vou comprar, mas quero consultoria',
    description: 'Lista de compra + quantidades + melhores marcas/cortes'
  },
];

export const CUTS_PLANS: {
  value: CutsPlan;
  label: string;
  description: string;
}[] = [
  {
    value: 'premium',
    label: 'Cortes Premium',
    description: 'Picanha, ancho, chorizo, fraldinha especial'
  },
  {
    value: 'standard',
    label: 'Cortes Standard',
    description: 'Fraldinha, costela, linguiça, coração'
  },
  {
    value: 'misto',
    label: 'Misto (Premium + Standard)',
    description: 'Combinação balanceada dos melhores cortes'
  },
  {
    value: 'personalizado',
    label: 'Personalizar',
    description: 'Escolha seus cortes e quantidades'
  },
];

export const AVAILABLE_CUTS = [
  { value: 'picanha', label: 'Picanha' },
  { value: 'ancho', label: 'Ancho' },
  { value: 'chorizo', label: 'Chorizo' },
  { value: 'fraldinha', label: 'Fraldinha' },
  { value: 'costela', label: 'Costela' },
  { value: 'linguica', label: 'Linguiça' },
  { value: 'coracao', label: 'Coração' },
  { value: 'sobrecoxa', label: 'Sobrecoxa' },
  { value: 'pao-alho', label: 'Pão de Alho' },
  { value: 'queijo-coalho', label: 'Queijo Coalho' },
];

export const MEAT_DONENESS_OPTIONS: {
  value: MeatDoneness;
  label: string;
  description: string;
  image: string;
}[] = [
  {
    value: 'mal-passada',
    label: 'Mal Passada',
    description: 'Centro vermelho/rosado, suculenta',
    image: '/images/ponto-mal-passada.jpg',
  },
  {
    value: 'ao-ponto',
    label: 'Ao Ponto',
    description: 'Centro rosado claro, equilíbrio perfeito',
    image: '/images/ponto-ao-ponto.jpg',
  },
  {
    value: 'bem-passada',
    label: 'Bem Passada',
    description: 'Totalmente cozida, mais firme',
    image: '/images/ponto-bem-passada.jpg',
  },
  {
    value: 'misto',
    label: 'Misto (Variado)',
    description: 'Diferentes pontos para agradar todos',
    image: '/images/ponto-misto.jpg',
  },
];

// Configuração do WhatsApp (altere aqui o número)
export const WHATSAPP_NUMBER = '5511999999999'; // Formato: código país + DDD + número
