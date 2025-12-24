import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Wizard from '@/components/wizard/Wizard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <Section id="hero" className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 text-charcoal leading-tight">
            Experiência de churrasco para momentos especiais
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Transforme seu evento em uma experiência gastronômica inesquecível. 
            Aniversários, chás revelação, casamentos e confraternizações com o toque premium do LipeSteak.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#orcamento">
              <Button size="lg" variant="primary">
                Simular Orçamento
              </Button>
            </Link>
            <Link href="/historia">
              <Button size="lg" variant="outline">
                Conheça Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Benefícios */}
      <Section id="servicos" background="white">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">Por que escolher o LipeSteak?</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hover={false}>
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-sans font-semibold text-xl mb-3 text-charcoal">Organização Total</h3>
              <p className="font-sans text-gray-600">
                Desde o planejamento até a execução, cuidamos de cada detalhe para que você aproveite seu evento sem preocupações.
              </p>
            </div>
          </Card>
          
          <Card hover={false}>
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-sans font-semibold text-xl mb-3 text-charcoal">Experiência Premium</h3>
              <p className="font-sans text-gray-600">
                Cortes selecionados, técnica apurada e apresentação impecável. Seu churrasco elevado a outro nível.
              </p>
            </div>
          </Card>
          
          <Card hover={false}>
            <div className="text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="font-sans font-semibold text-xl mb-3 text-charcoal">Tranquilidade pro Anfitrião</h3>
              <p className="font-sans text-gray-600">
                Você é o convidado de honra. Aproveite seu evento enquanto garantimos uma experiência memorável para todos.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Como Funciona */}
      <Section id="como-funciona" background="default">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">Como funciona</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center font-sans font-bold text-charcoal text-xl">
                1
              </div>
              <div>
                <h3 className="font-sans font-semibold text-xl mb-2 text-charcoal">Simule seu orçamento</h3>
                <p className="font-sans text-gray-600">
                  Use nosso simulador interativo para receber uma estimativa personalizada em minutos. 
                  Escolha o tipo de evento, número de pessoas e preferências.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center font-sans font-bold text-charcoal text-xl">
                2
              </div>
              <div>
                <h3 className="font-sans font-semibold text-xl mb-2 text-charcoal">Ajustamos os detalhes</h3>
                <p className="font-sans text-gray-600">
                  Após o contato inicial via WhatsApp, conversamos sobre particularidades do seu evento, 
                  cardápio específico e qualquer pedido especial.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-full flex items-center justify-center font-sans font-bold text-charcoal text-xl">
                3
              </div>
              <div>
                <h3 className="font-sans font-semibold text-xl mb-2 text-charcoal">Aproveite seu evento</h3>
                <p className="font-sans text-gray-600">
                  No dia marcado, chegamos com antecedência, preparamos tudo e garantimos que seu churrasco 
                  seja uma experiência inesquecível para você e seus convidados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Wizard / Orçamento */}
      <Section id="orcamento" background="white">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">Simule seu orçamento</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto">
            Responda algumas perguntas e receba uma estimativa personalizada na hora. 
            É rápido, fácil e sem compromisso.
          </p>
        </div>
        
        <Wizard />
      </Section>

      {/* FAQ */}
      <Section id="faq" background="default">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">Perguntas Frequentes</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Card hover={false}>
            <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
              Qual é a antecedência mínima para contratar?
            </h3>
            <p className="font-sans text-gray-600">
              Recomendamos pelo menos 2 semanas de antecedência para eventos menores e 1 mês para eventos com mais de 80 pessoas. 
              Mas entre em contato, podemos avaliar disponibilidade para datas mais próximas.
            </p>
          </Card>
          
          <Card hover={false}>
            <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
              Vocês fornecem equipamentos (churrasqueira, utensílios)?
            </h3>
            <p className="font-sans text-gray-600">
              Sim! Levamos todos os equipamentos necessários para preparar o churrasco. 
              Você só precisa garantir o espaço e, se optar, as carnes (ou deixe conosco).
            </p>
          </Card>
          
          <Card hover={false}>
            <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
              E se eu quiser comprar as carnes por conta própria?
            </h3>
            <p className="font-sans text-gray-600">
              Sem problemas! Oferecemos consultoria para lista de compra, quantidades e melhores marcas. 
              Ou, se preferir, nós compramos e levamos tudo selecionado.
            </p>
          </Card>
          
          <Card hover={false}>
            <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
              Qual é a área de atendimento?
            </h3>
            <p className="font-sans text-gray-600">
              Atendemos Franco da Rocha e região metropolitana de São Paulo. 
              Para locais mais distantes, podemos ajustar o orçamento incluindo deslocamento.
            </p>
          </Card>
          
          <Card hover={false}>
            <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
              Como funciona o pagamento?
            </h3>
            <p className="font-sans text-gray-600">
              Geralmente trabalhamos com sinal de 50% na confirmação e o restante no dia do evento. 
              Aceitamos PIX, transferência e dinheiro. Detalhes são ajustados no orçamento final.
            </p>
          </Card>
          
          <Card hover={false}>
            <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
              Posso fazer alterações no cardápio?
            </h3>
            <p className="font-sans text-gray-600">
              Com certeza! O cardápio é flexível e adaptamos conforme seu gosto e orçamento. 
              Cortes especiais, opções vegetarianas, acompanhamentos — tudo pode ser ajustado.
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA Final */}
      <Section background="dark" className="text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Pronto para tornar seu evento inesquecível?
        </h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
        <p className="font-sans text-lg text-off-white/80 mb-8 max-w-2xl mx-auto">
          Entre em contato agora e vamos planejar juntos a experiência perfeita de churrasco.
        </p>
        <Link href="#orcamento">
          <Button size="lg" variant="secondary">
            Simular Orçamento Agora
          </Button>
        </Link>
      </Section>

      <Footer />
    </div>
  );
}
