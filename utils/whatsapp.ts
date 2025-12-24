import { WizardFormData, EVENT_TYPES, MEAT_DONENESS_OPTIONS, WHATSAPP_NUMBER } from '@/types';

export function generateWhatsAppMessage(data: WizardFormData, estimativa: string): string {
  const eventType = EVENT_TYPES.find(e => e.value === data.tipoEvento)?.label || 'Evento';
  const pontoCarne = MEAT_DONENESS_OPTIONS.find(p => p.value === data.pontoCarne)?.label || 'Ao Ponto';
  
  let message = `Olá! Gostaria de solicitar um orçamento para churrasco.\n\n`;
  message += `📋 *Dados do Evento:*\n`;
  message += `• Tipo: ${eventType}\n`;
  message += `• Data: ${data.dataEvento || 'A definir'}\n`;
  message += `• Cidade: ${data.cidade}\n`;
  message += `• Número de pessoas: ${data.numeroPessoas}\n`;
  message += `• Duração: ${data.duracao}h\n\n`;
  
  message += `🥩 *Carnes:*\n`;
  if (data.responsabilidadeCarnes === 'lipesteak-compra') {
    message += `• LipeSteak compra e leva (${data.planoCortes})\n`;
  } else if (data.responsabilidadeCarnes === 'consultoria') {
    message += `• Consultoria para compra\n`;
  } else {
    message += `• Cliente disponibiliza\n`;
    if (data.carnesDisponibilizadas) {
      message += `• Carnes: ${data.carnesDisponibilizadas}\n`;
    }
  }
  message += `• Ponto preferencial: ${pontoCarne}\n`;
  message += `\n`;
  
  const extrasAtivos = [];
  if (data.extras.horaExtra) extrasAtivos.push('Hora extra');
  if (data.extras.corteEspecial) extrasAtivos.push('Corte especial premium');
  if (data.extras.consultoria) extrasAtivos.push('Consultoria');
  if (data.extras.harmonizacao) extrasAtivos.push('Harmonização');
  
  if (extrasAtivos.length > 0) {
    message += `✨ *Extras:*\n`;
    extrasAtivos.forEach(extra => {
      message += `• ${extra}\n`;
    });
    message += `\n`;
  }
  
  message += `💰 *Estimativa:* ${estimativa}\n\n`;
  
  message += `👤 *Contato:*\n`;
  message += `• Nome: ${data.contato.nome}\n`;
  message += `• Telefone: ${data.contato.telefone}\n`;
  if (data.contato.email) {
    message += `• Email: ${data.contato.email}\n`;
  }
  
  if (data.contato.observacoes) {
    message += `\n📝 *Observações:*\n${data.contato.observacoes}\n`;
  }
  
  message += `\nAguardo retorno para finalizarmos os detalhes!`;
  
  return message;
}

export function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
