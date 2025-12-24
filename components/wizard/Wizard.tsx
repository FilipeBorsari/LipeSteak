'use client';

import { useState, useEffect } from 'react';
import {
  WizardFormData,
  EventType,
  MeatResponsibility,
  CutsPlan,
  EVENT_TYPES,
  MEAT_RESPONSIBILITY_OPTIONS,
  CUTS_PLANS,
  CustomCutItem,
} from '@/types';
import Button from '../Button';
import Card from '../Card';
import FormField from '../FormField';
import Stepper from './Stepper';
import Progress from './Progress';
import CutsCard from './CutsCard';
import CustomCutsEditor from './CustomCutsEditor';
import MeatDonenessSlider from './MeatDonenessSlider';
import EstimateSummary from './EstimateSummary';
import { computeEstimate } from '@/utils/estimate';
import { generateWhatsAppMessage, generateWhatsAppLink } from '@/utils/whatsapp';

const STORAGE_KEY = 'lipesteak-wizard-data';

const STEP_NAMES = [
  'Tipo de Evento',
  'Pessoas',
  'Duração',
  'Carnes',
  'Cortes',
  'Finalizar',
];

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>({
    tipoEvento: 'aniversario',
    cidade: 'Franco da Rocha - SP',
    numeroPessoas: 30,
    duracao: 4,
    responsabilidadeCarnes: 'lipesteak-compra',
    planoCortes: 'misto',
    pontoCarne: 'ao-ponto',
    extras: {
      horaExtra: false,
      corteEspecial: false,
      consultoria: false,
      harmonizacao: false,
    },
    contato: {
      nome: '',
      telefone: '',
      email: '',
      observacoes: '',
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData);
        setCurrentStep(parsed.currentStep);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ formData, currentStep })
    );
  }, [formData, currentStep]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value,
      },
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.tipoEvento) {
          newErrors.tipoEvento = 'Selecione o tipo de evento';
        }
        break;
      case 2:
        if (formData.numeroPessoas < 10 || formData.numeroPessoas > 120) {
          newErrors.numeroPessoas = 'Número de pessoas deve estar entre 10 e 120';
        }
        break;
      case 3:
        if (formData.duracao < 2) {
          newErrors.duracao = 'Duração mínima é 2 horas';
        }
        break;
      case 4:
        if (
          formData.responsabilidadeCarnes === 'cliente-disponibiliza' &&
          !formData.carnesDisponibilizadas?.trim()
        ) {
          newErrors.carnesDisponibilizadas = 'Descreva quais carnes você terá no evento';
        }
      case 5:
        if (!formData.planoCortes) {
          newErrors.planoCortes = 'Selecione um plano de cortes';
        }
        if (
          formData.planoCortes === 'personalizado' &&
          (!formData.cortesPersonalizados || formData.cortesPersonalizados.length === 0)
        ) {
          newErrors.cortesPersonalizados = 'Adicione pelo menos um corte personalizado';
        }
        if (!formData.pontoCarne) {
          newErrors.pontoCarne = 'Selecione o ponto da carne';
        }
        break;
        break;
      case 6:
        if (!formData.contato.nome.trim()) {
          newErrors['contato.nome'] = 'Nome é obrigatório';
        }
        if (!formData.contato.telefone.trim()) {
          newErrors['contato.telefone'] = 'Telefone é obrigatório';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEP_NAMES.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(6)) return;

    const estimate = computeEstimate(formData);
    const estimativaTexto = `R$ ${estimate.valorMinimo.toLocaleString('pt-BR')} – R$ ${estimate.valorMaximo.toLocaleString('pt-BR')}`;
    const message = generateWhatsAppMessage(formData, estimativaTexto);
    const whatsappLink = generateWhatsAppLink(message);

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);

    // Open WhatsApp
    window.open(whatsappLink, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 4:
        return <Step4 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 5:
        return <Step5 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 6:
        return <Step6 formData={formData} updateFormData={updateFormData} updateNestedFormData={updateNestedFormData} errors={errors} />;
      default:
        return null;
    }
  };

  const estimate = currentStep === 6 ? computeEstimate(formData) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <Stepper steps={STEP_NAMES} currentStep={currentStep} />
      <Progress currentStep={currentStep} totalSteps={STEP_NAMES.length} />

      <div className="min-h-[500px]">{renderStep()}</div>

      {currentStep === 6 && estimate && (
        <div className="mt-8">
          <EstimateSummary estimate={estimate} />
        </div>
      )}

      <div className="flex gap-4 mt-8">
        {currentStep > 1 && (
          <Button onClick={prevStep} variant="outline" className="flex-1">
            ← Voltar
          </Button>
        )}
        {currentStep < STEP_NAMES.length ? (
          <Button onClick={nextStep} variant="primary" className="flex-1">
            Avançar →
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="secondary" className="flex-1">
            Ver Estimativa + Enviar WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
}

// Step Components

function Step1({
  formData,
  updateFormData,
  errors,
}: {
  formData: WizardFormData;
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl mb-2 text-charcoal">Qual tipo de evento?</h2>
        <p className="text-gray-600 font-sans">Conte-nos sobre a ocasião especial</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENT_TYPES.map((event) => (
          <Card
            key={event.value}
            selected={formData.tipoEvento === event.value}
            onClick={() => updateFormData('tipoEvento', event.value)}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">
                {event.value === 'aniversario' && '🎂'}
                {event.value === 'cha-revelacao' && '👶'}
                {event.value === 'casamento' && '💍'}
                {event.value === 'confraternizacao' && '🎉'}
                {event.value === 'outro' && '✨'}
              </div>
              <h3 className="font-sans font-semibold text-lg text-charcoal">{event.label}</h3>
            </div>
          </Card>
        ))}
      </div>

      {errors.tipoEvento && <p className="text-red-500 text-sm">{errors.tipoEvento}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Data do Evento"
          id="dataEvento"
          type="date"
          value={formData.dataEvento || ''}
          onChange={(value) => updateFormData('dataEvento', value)}
          helpText="Opcional"
        />
        <FormField
          label="Cidade"
          id="cidade"
          type="text"
          value={formData.cidade}
          onChange={(value) => updateFormData('cidade', value)}
          required
        />
      </div>
    </div>
  );
}

function Step2({
  formData,
  updateFormData,
  errors,
}: {
  formData: WizardFormData;
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
}) {
  const getRecommendation = (pessoas: number) => {
    if (pessoas <= 20) return 'Para esse número, recomendamos 4-5 horas de serviço';
    if (pessoas <= 50) return 'Para esse número, recomendamos 5-6 horas de serviço';
    return 'Para eventos maiores, recomendamos 6+ horas de serviço';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl mb-2 text-charcoal">Quantas pessoas?</h2>
        <p className="text-gray-600 font-sans">Informe o número estimado de convidados</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="pessoas-slider" className="block text-sm font-medium mb-2 text-charcoal">
            Número de pessoas: <span className="text-gold font-bold text-2xl">{formData.numeroPessoas}</span>
          </label>
          <input
            id="pessoas-slider"
            type="range"
            min="10"
            max="120"
            step="5"
            value={formData.numeroPessoas}
            onChange={(e) => updateFormData('numeroPessoas', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>10</span>
            <span>120</span>
          </div>
        </div>

        <FormField
          label="Ou digite o número exato"
          id="numeroPessoas"
          type="number"
          min={10}
          max={120}
          value={formData.numeroPessoas}
          onChange={(value) => updateFormData('numeroPessoas', value)}
          error={errors.numeroPessoas}
        />

        <Card className="bg-gold/10 border border-gold/30">
          <p className="text-sm text-charcoal font-sans">
            💡 {getRecommendation(formData.numeroPessoas)}
          </p>
        </Card>
      </div>
    </div>
  );
}

function Step3({
  formData,
  updateFormData,
  errors,
}: {
  formData: WizardFormData;
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
}) {
  const duracoes = [4, 5, 6];
  const [customDuration, setCustomDuration] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl mb-2 text-charcoal">Duração do serviço</h2>
        <p className="text-gray-600 font-sans">Quantas horas de churrasco você precisa?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {duracoes.map((duracao) => (
          <Card
            key={duracao}
            selected={formData.duracao === duracao && !customDuration}
            onClick={() => {
              updateFormData('duracao', duracao);
              setCustomDuration(false);
            }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-1">{duracao}h</div>
              <p className="text-sm text-gray-600 font-sans">
                {duracao === 4 && 'Básico'}
                {duracao === 5 && 'Ideal'}
                {duracao === 6 && 'Completo'}
              </p>
            </div>
          </Card>
        ))}
        <Card
          selected={customDuration}
          onClick={() => setCustomDuration(true)}
        >
          <div className="text-center">
            <div className="text-2xl mb-1">✏️</div>
            <p className="text-sm font-sans font-semibold text-charcoal">Personalizado</p>
          </div>
        </Card>
      </div>

      {customDuration && (
        <FormField
          label="Quantas horas?"
          id="duracaoCustom"
          type="number"
          min={2}
          max={12}
          step={0.5}
          value={formData.duracao}
          onChange={(value) => updateFormData('duracao', value)}
          error={errors.duracao}
        />
      )}

      <Card className="bg-charcoal/5">
        <p className="text-sm text-charcoal font-sans">
          <strong>Atenção:</strong> Horas extras além das contratadas possuem custo adicional.
        </p>
      </Card>
    </div>
  );
}

function Step4({
  formData,
  updateFormData,
  errors,
}: {
  formData: WizardFormData;
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl mb-2 text-charcoal">Quem compra as carnes?</h2>
        <p className="text-gray-600 font-sans">Escolha a opção que melhor se adequa</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MEAT_RESPONSIBILITY_OPTIONS.map((option) => (
          <Card
            key={option.value}
            selected={formData.responsabilidadeCarnes === option.value}
            onClick={() => updateFormData('responsabilidadeCarnes', option.value)}
          >
            <h3 className="font-sans font-semibold text-lg mb-1 text-charcoal">{option.label}</h3>
            <p className="text-sm text-gray-600 font-sans">{option.description}</p>
          </Card>
        ))}
      </div>

      {formData.responsabilidadeCarnes === 'cliente-disponibiliza' && (
        <div className="mt-4">
          <FormField
            label="Quais carnes você terá no evento?"
            id="carnesDisponibilizadas"
            type="textarea"
            value={formData.carnesDisponibilizadas || ''}
            onChange={(value) => updateFormData('carnesDisponibilizadas', value)}
            placeholder="Ex: picanha, fraldinha, linguiça toscana, coração de frango..."
            required
            error={errors.carnesDisponibilizadas}
            rows={4}
          />
          <Card className="bg-yellow-50 border border-yellow-200 mt-4">
            <p className="text-sm text-charcoal font-sans">
              ⚠️ O preço final pode ser ajustado conforme a qualidade e quantidade dos cortes fornecidos.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

function Step5({
  formData,
  updateFormData,
  errors,
}: {
  formData: WizardFormData;
  updateFormData: (field: string, value: any) => void;
  errors: Record<string, string>;
}) {
  // Se o cliente disponibiliza as carnes, não mostra seleção de cortes mas mantém seletor de ponto
  if (formData.responsabilidadeCarnes === 'cliente-disponibiliza') {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <h2 className="font-serif text-3xl mb-4 text-charcoal">Seleção de cortes</h2>
          <p className="text-gray-600 font-sans text-lg">
            Como você irá disponibilizar as carnes, não é necessário selecionar os cortes.
          </p>
        </div>

        {/* Seletor de ponto da carne */}
        <div className="pt-6 border-t-2 border-gold/20">
          <MeatDonenessSlider
            value={formData.pontoCarne}
            onChange={(value) => updateFormData('pontoCarne', value)}
          />
          {errors.pontoCarne && (
            <p className="text-red-500 text-sm mt-2">{errors.pontoCarne}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl mb-2 text-charcoal">Seleção de cortes</h2>
        <p className="text-gray-600 font-sans">Escolha o plano ideal para seu evento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CUTS_PLANS.map((plan) => (
          <CutsCard
            key={plan.value}
            value={plan.value}
            label={plan.label}
            description={plan.description}
            imageSrc={`/images/cuts-${plan.value}.png`}
            selected={formData.planoCortes === plan.value}
            onSelect={() => updateFormData('planoCortes', plan.value)}
          />
        ))}
      </div>

      {errors.planoCortes && <p className="text-red-500 text-sm">{errors.planoCortes}</p>}

      {formData.planoCortes === 'personalizado' && (
        <div className="mt-6">
          <CustomCutsEditor
            items={formData.cortesPersonalizados || []}
            onChange={(items) => updateFormData('cortesPersonalizados', items)}
          />
          {errors.cortesPersonalizados && (
            <p className="text-red-500 text-sm mt-2">{errors.cortesPersonalizados}</p>
          )}
        </div>
      )}

      {/* Seletor de ponto da carne */}
      {formData.planoCortes && (
        <div className="pt-6 border-t-2 border-gold/20">
          <MeatDonenessSlider
            value={formData.pontoCarne}
            onChange={(value) => updateFormData('pontoCarne', value)}
          />
          {errors.pontoCarne && (
            <p className="text-red-500 text-sm mt-2">{errors.pontoCarne}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Step6({
  formData,
  updateFormData,
  updateNestedFormData,
  errors,
}: {
  formData: WizardFormData;
  updateFormData: (field: string, value: any) => void;
  updateNestedFormData: (parent: string, field: string, value: any) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl mb-2 text-charcoal">Últimos detalhes</h2>
        <p className="text-gray-600 font-sans">Extras e informações de contato</p>
      </div>

      <div>
        <h3 className="font-sans font-semibold text-lg mb-4 text-charcoal">Extras</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.extras.horaExtra}
              onChange={(e) => updateNestedFormData('extras', 'horaExtra', e.target.checked)}
              className="mt-1 w-5 h-5 accent-gold"
            />
            <div>
              <div className="font-sans font-medium text-charcoal">Hora extra</div>
              <div className="text-sm text-gray-600">Adicionar horas além do combinado</div>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.extras.corteEspecial}
              onChange={(e) => updateNestedFormData('extras', 'corteEspecial', e.target.checked)}
              className="mt-1 w-5 h-5 accent-gold"
            />
            <div>
              <div className="font-sans font-medium text-charcoal">Corte especial premium</div>
              <div className="text-sm text-gray-600">Ancho, chorizo, T-bone</div>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.extras.consultoria}
              onChange={(e) => updateNestedFormData('extras', 'consultoria', e.target.checked)}
              className="mt-1 w-5 h-5 accent-gold"
            />
            <div>
              <div className="font-sans font-medium text-charcoal">Consultoria</div>
              <div className="text-sm text-gray-600">Lista de compra e recomendações</div>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.extras.harmonizacao}
              onChange={(e) => updateNestedFormData('extras', 'harmonizacao', e.target.checked)}
              className="mt-1 w-5 h-5 accent-gold"
            />
            <div>
              <div className="font-sans font-medium text-charcoal">Harmonização</div>
              <div className="text-sm text-gray-600">Sugestão de bebidas</div>
            </div>
          </label>
        </div>
      </div>

      <div className="border-t border-gold/20 pt-6">
        <h3 className="font-sans font-semibold text-lg mb-4 text-charcoal">Contato</h3>
        <div className="space-y-4">
          <FormField
            label="Nome completo"
            id="nome"
            type="text"
            value={formData.contato.nome}
            onChange={(value) => updateNestedFormData('contato', 'nome', value)}
            required
            error={errors['contato.nome']}
          />
          <FormField
            label="WhatsApp"
            id="telefone"
            type="tel"
            value={formData.contato.telefone}
            onChange={(value) => updateNestedFormData('contato', 'telefone', value)}
            placeholder="(11) 99999-9999"
            required
            error={errors['contato.telefone']}
          />
          <FormField
            label="E-mail"
            id="email"
            type="email"
            value={formData.contato.email || ''}
            onChange={(value) => updateNestedFormData('contato', 'email', value)}
            helpText="Opcional"
          />
          <FormField
            label="Observações"
            id="observacoes"
            type="textarea"
            value={formData.contato.observacoes || ''}
            onChange={(value) => updateNestedFormData('contato', 'observacoes', value)}
            placeholder="Alguma informação adicional que deseja compartilhar?"
            rows={4}
            helpText="Opcional"
          />
        </div>
      </div>
    </div>
  );
}
