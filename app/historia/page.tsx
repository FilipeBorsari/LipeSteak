import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function HistoriaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <Section className="pt-24 pb-12 md:pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal">
            Minha História
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-lg md:text-xl text-gray-700">
            Mais do que churrasco, uma paixão transformada em experiências memoráveis
          </p>
        </div>
      </Section>

      {/* História */}
      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-serif text-3xl mb-4 text-charcoal">Como tudo começou</h2>
            <div className="w-16 h-1 bg-gold mb-6"></div>
            <div className="space-y-4 font-sans text-gray-700 leading-relaxed">
              <p>
                Desde criança, o churrasco sempre foi parte das minhas memórias mais especiais. 
                Reunir a família, o cheiro da brasa, as risadas... tudo isso me marcou profundamente.
              </p>
              <p>
                Com o tempo, percebi que tinha um talento natural para o churrasco. 
                Não era apenas sobre colocar carne na grelha — era sobre timing, técnica, 
                seleção dos cortes certos e criar uma experiência completa.
              </p>
              <p>
                Foi em 2024 que transformei essa paixão em profissão. Comecei fazendo churrascos 
                para amigos e familiares, e logo os pedidos começaram a crescer. Cada evento era 
                uma oportunidade de aprender, aperfeiçoar e principalmente, ver o sorriso das pessoas.
              </p>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/historia-1.jpeg"
              alt="LipeSteak - Churrasqueiro"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/historia-2.jpeg"
              alt="LipeSteak - No trabalho"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl mb-4 text-charcoal">O que nos diferencia</h2>
            <div className="w-16 h-1 bg-gold mb-6"></div>
            <div className="space-y-4 font-sans text-gray-700 leading-relaxed">
              <p>
                O LipeSteak nasceu com um propósito claro: elevar a experiência do churrasco. 
                Não é apenas sobre alimentar pessoas, é sobre criar momentos inesquecíveis.
              </p>
              <p>
                Trabalhamos com cortes selecionados, técnicas refinadas e, principalmente, 
                uma dedicação absoluta aos detalhes. Cada evento é único, e tratamos como tal.
              </p>
              <p>
                Meu objetivo é simples: que o anfitrião possa aproveitar o próprio evento. 
                Enquanto cuido de tudo relacionado ao churrasco, você relaxa e celebra com seus convidados.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section background="default">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">Nossos Valores</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hover={false}>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-sans font-semibold text-xl mb-3 text-charcoal">Excelência</h3>
              <p className="font-sans text-gray-600">
                Buscamos a perfeição em cada detalhe, desde a seleção das carnes até 
                o ponto ideal de cada corte.
              </p>
            </div>
          </Card>
          
          <Card hover={false}>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-sans font-semibold text-xl mb-3 text-charcoal">Compromisso</h3>
              <p className="font-sans text-gray-600">
                Seu evento é nossa prioridade. Cumprimos prazos, respeitamos acordos e 
                vamos além das expectativas.
              </p>
            </div>
          </Card>
          
          <Card hover={false}>
            <div className="text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="font-sans font-semibold text-xl mb-3 text-charcoal">Paixão</h3>
              <p className="font-sans text-gray-600">
                Cada churrasco é feito com amor e dedicação. Essa é a diferença que 
                você sente em cada mordida.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Como Trabalhamos */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">
              Como trabalhamos
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
            <p className="font-sans text-gray-600">
              Nosso processo é pensado para garantir sua tranquilidade e o sucesso do seu evento
            </p>
          </div>
          
          <div className="space-y-6">
            <Card hover={false} className="border-l-4 border-gold">
              <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
                📞 Primeiro Contato
              </h3>
              <p className="font-sans text-gray-600">
                Conversamos sobre seu evento, suas expectativas e necessidades específicas. 
                Fazemos um levantamento completo para entender exatamente o que você precisa.
              </p>
            </Card>
            
            <Card hover={false} className="border-l-4 border-gold">
              <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
                📋 Planejamento Detalhado
              </h3>
              <p className="font-sans text-gray-600">
                Montamos o cardápio, definimos horários, lista de equipamentos e todos os 
                detalhes logísticos. Você recebe um orçamento transparente e completo.
              </p>
            </Card>
            
            <Card hover={false} className="border-l-4 border-gold">
              <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
                🛒 Preparação
              </h3>
              <p className="font-sans text-gray-600">
                Se optou por carnes inclusas, fazemos a seleção e compra dos melhores cortes. 
                Preparamos e organizamos todos os equipamentos.
              </p>
            </Card>
            
            <Card hover={false} className="border-l-4 border-gold">
              <h3 className="font-sans font-semibold text-lg mb-2 text-charcoal">
                🔥 Dia do Evento
              </h3>
              <p className="font-sans text-gray-600">
                Chegamos com antecedência, montamos a estrutura e cuidamos de tudo. 
                Você só precisa aproveitar e receber os elogios dos convidados.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Galeria Placeholder */}
      <Section background="default">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">
            Momentos Especiais
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative h-48 rounded-lg overflow-hidden shadow-md">
              <Image
                src={`/images/galeria-${i}.jpg`}
                alt={`Galeria ${i}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark" className="text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          Vamos criar juntos seu próximo evento memorável?
        </h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
        <p className="font-sans text-lg text-off-white/80 mb-8 max-w-2xl mx-auto">
          Entre em contato agora e descubra como podemos tornar seu evento inesquecível.
        </p>
        <Link href="/#orcamento">
          <Button size="lg" variant="secondary">
            Fazer Orçamento
          </Button>
        </Link>
      </Section>

      <Footer />
    </div>
  );
}
