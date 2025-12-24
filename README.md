# LipeSteak - Site Oficial

Site completo para a marca **LipeSteak**, especializada em churrasco premium para eventos. O site oferece uma experiência interativa para simulação de orçamentos e conversão de leads via WhatsApp.

## 🎯 Características

- **Design Premium**: Paleta elegante com off-white (#F2F0EB), preto carvão (#0F0F0F) e dourado fosco (#B89B5E)
- **Totalmente Responsivo**: Mobile-first, otimizado para todos os dispositivos
- **Wizard Interativo**: Formulário em 6 passos para simulação de orçamento
- **Integração WhatsApp**: Geração automática de mensagem formatada
- **Persistência de Dados**: LocalStorage para não perder progresso
- **Acessibilidade**: ARIA labels, foco visível, contraste adequado

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** (Playfair Display + Inter)

## 📦 Instalação

```bash
# Clone o repositório (se aplicável)
# cd lipeSteak

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
lipeSteak/
├── app/
│   ├── layout.tsx          # Layout principal com fontes
│   ├── page.tsx            # Página inicial (Home)
│   ├── historia/
│   │   └── page.tsx        # Página "Minha História"
│   └── globals.css         # Estilos globais
├── components/
│   ├── Header.tsx          # Cabeçalho com navegação
│   ├── Footer.tsx          # Rodapé
│   ├── Button.tsx          # Botão reutilizável
│   ├── Card.tsx            # Card reutilizável
│   ├── Section.tsx         # Seção de página
│   ├── FormField.tsx       # Campo de formulário
│   └── wizard/
│       ├── Wizard.tsx      # Componente principal do wizard
│       ├── Stepper.tsx     # Indicador de passos
│       ├── Progress.tsx    # Barra de progresso
│       ├── CutsCard.tsx    # Card de seleção de cortes
│       ├── CustomCutsEditor.tsx  # Editor de cortes personalizados
│       └── EstimateSummary.tsx   # Resumo da estimativa
├── types/
│   └── index.ts            # Types TypeScript
├── utils/
│   ├── estimate.ts         # Lógica de cálculo de orçamento
│   └── whatsapp.ts         # Geração de mensagem WhatsApp
├── public/
│   └── images/             # Imagens (substitua os placeholders)
├── tailwind.config.ts      # Configuração do Tailwind
├── tsconfig.json           # Configuração TypeScript
├── next.config.js          # Configuração Next.js
└── package.json            # Dependências
```

## 🎨 Imagens Placeholder

As seguintes imagens precisam ser adicionadas em `/public/images/`:

### Cortes (para o wizard)
- `cuts-premium.jpg` - Foto de cortes premium
- `cuts-standard.jpg` - Foto de cortes standard
- `cuts-misto.jpg` - Foto de cortes mistos
- `cuts-personalizado.jpg` - Foto genérica de churrasco

### Ponto da Carne (slider do wizard)
- `ponto-mal-passada.jpg` - Imagem de carne mal passada
- `ponto-ao-ponto.jpg` - Imagem de carne ao ponto
- `ponto-bem-passada.jpg` - Imagem de carne bem passada
- `ponto-misto.jpg` - Imagem representando variação de pontos

### História
- `historia-1.jpg` - Foto do churrasqueiro/fundador
- `historia-2.jpg` - Foto de evento ou churrasco

### Galeria (8 imagens)
- `galeria-1.jpg` a `galeria-8.jpg` - Fotos de eventos, churrascos, clientes felizes

**Dimensões recomendadas:**
- Cortes: 800x600px (4:3)
- História: 1200x900px
- Galeria: 600x600px (quadrado)

**Formato:** JPG otimizado (max 200KB cada)

## ⚙️ Configurações Importantes

### WhatsApp
Edite o número no arquivo `/types/index.ts`:
```typescript
export const WHATSAPP_NUMBER = '5511999999999'; // Altere aqui
```

### Cores da Marca
Configuradas em `/tailwind.config.ts`:
```typescript
colors: {
  'off-white': '#F2F0EB',
  'charcoal': '#0F0F0F',
  'gold': '#B89B5E',
}
```

### Metadados SEO
Edite em `/app/layout.tsx` conforme necessário.

## 📋 Funcionalidades do Wizard

### Passo 1: Tipo de Evento
- Seleção entre: Aniversário, Chá Revelação, Casamento, Confraternização, Outro
- Data opcional e cidade (padrão: Franco da Rocha - SP)

### Passo 2: Número de Pessoas
- Slider interativo (10-120 pessoas)
- Recomendações dinâmicas de duração

### Passo 3: Duração do Serviço
- Opções pré-definidas: 4h, 5h, 6h
- Campo personalizado para duração customizada

### Passo 4: Responsabilidade pelas Carnes
- Cliente disponibiliza (com textarea obrigatório)
- LipeSteak compra e leva
- Consultoria de compra

### Passo 5: Seleção de Cortes
- Premium, Standard, Misto ou Personalizado
- Editor de cortes personalizados (tipo, quantidade, unidade)
- **Slider de ponto da carne**: Mal passada, ao ponto, bem passada ou misto
- Imagem dinâmica que muda conforme seleção do ponto

### Passo 6: Extras e Contato
- Checkboxes: hora extra, corte especial, consultoria, harmonização
- Formulário de contato: nome*, telefone*, email, observações

## 💰 Cálculo de Orçamento

A função `computeEstimate()` em `/utils/estimate.ts` calcula:

- **Taxa base**: Varia conforme duração e número de pessoas
- **Carnes inclusas**: ~R$ 70 por pessoa (se LipeSteak compra)
- **Consultoria**: R$ 400
- **Hora extra**: R$ 350 por hora adicional
- **Premium**: R$ 15 por pessoa

Faixa final: ±15% do valor total calculado

## 🔧 Personalização

### Ajustar Preços
Edite `/utils/estimate.ts` e modifique os valores nas constantes.

### Adicionar Novos Tipos de Evento
Edite `/types/index.ts` em `EVENT_TYPES`.

### Adicionar Cortes
Edite `/types/index.ts` em `AVAILABLE_CUTS`.

## 📱 Responsividade

O site é otimizado para:
- Mobile: 375px+ (iPhone 12 como referência)
- Tablet: 768px+
- Desktop: 1024px+

Todos os componentes usam classes Tailwind responsivas (`md:`, `lg:`).

## 🚀 Deploy

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

**Recomendações de hospedagem:**
- Vercel (recomendado para Next.js)
- Netlify
- AWS Amplify

## 📝 Checklist Pré-Lançamento

- [ ] Substituir imagens placeholder por fotos reais
- [ ] Configurar número de WhatsApp correto
- [ ] Testar formulário completo em mobile
- [ ] Testar envio para WhatsApp
- [ ] Validar todas as páginas (Home, História)
- [ ] Configurar domínio personalizado
- [ ] Configurar analytics (Google Analytics, etc.)
- [ ] Testar acessibilidade com leitor de tela

## 🐛 Troubleshooting

### Imagens não aparecem
- Certifique-se de que as imagens estão em `/public/images/`
- Nomes devem ser exatamente como referenciados no código
- Use `npm run dev` para rebuild

### WhatsApp não abre
- Verifique o número em `/types/index.ts`
- Formato correto: código país + DDD + número (sem espaços ou caracteres especiais)

### Wizard perde dados ao recarregar
- Verifique se o localStorage está habilitado no navegador
- Modo anônimo/privado pode bloquear localStorage

## 📞 Suporte

Para questões técnicas ou sugestões de melhorias, entre em contato ou abra uma issue.

---

**Desenvolvido com ❤️ para LipeSteak - Churrasco Premium**
