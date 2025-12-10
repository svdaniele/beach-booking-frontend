import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-mono">
      <Navbar />

      {/* Hero Section - BRUTALIST */}
      <section className="bg-yellow-400 border-b-8 border-black py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text & CTA */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold uppercase text-black mb-6 leading-none">
                PRENOTA<br />IL TUO<br />OMBRELLONE
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-black font-bold uppercase max-w-2xl">
                Sistema brutale per gestire le prenotazioni del tuo stabilimento balneare
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/prenota"
                  className="px-8 py-4 bg-black text-white border-4 border-black font-bold uppercase text-lg hover:bg-white hover:text-black transition-colors"
                >
                  PRENOTA ORA →
                </a>
                <a
                  href="/register"
                  className="px-8 py-4 bg-white text-black border-4 border-black font-bold uppercase text-lg hover:bg-black hover:text-white transition-colors"
                >
                  REGISTRA STABILIMENTO
                </a>
              </div>
            </div>

            {/* Right - Graphic Element */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square">
                {/* Beach umbrella illustration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500 border-4 border-black rounded-t-full transform rotate-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>
                <div className="absolute top-44 left-1/2 -translate-x-1/2 w-3 h-40 bg-black"></div>
                
                {/* Second umbrella */}
                <div className="absolute top-12 right-8 w-32 h-32 bg-cyan-400 border-4 border-black rounded-t-full transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                <div className="absolute top-40 right-20 w-2 h-28 bg-black transform rotate-12"></div>
                
                {/* Third umbrella */}
                <div className="absolute top-20 left-4 w-28 h-28 bg-pink-400 border-4 border-black rounded-t-full transform -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                <div className="absolute top-44 left-16 w-2 h-24 bg-black transform -rotate-12"></div>
                
                {/* Beach/sand element */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-amber-300 border-t-4 border-black"></div>
                
                {/* Sun */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                
                {/* Wave decorations */}
                <div className="absolute bottom-16 left-0 right-0 h-8 bg-blue-400 border-t-4 border-b-4 border-black"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - BRUTALIST */}
      <section className="py-20 bg-white border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold uppercase text-black mb-12 border-b-4 border-black pb-4 inline-block">
            PERCHÉ NOI?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-cyan-400 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-6xl mb-4">🏖️</div>
              <h3 className="text-2xl font-bold uppercase mb-3 text-black">FACILE</h3>
              <p className="text-black font-mono">
                Sistema intuitivo. Prenota in pochi click. Niente complicazioni.
              </p>
            </div>

            <div className="bg-pink-400 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-2xl font-bold uppercase mb-3 text-black">DASHBOARD</h3>
              <p className="text-black font-mono">
                Gestisci tutto da un'unica interfaccia. Ombrelloni, prenotazioni, pagamenti.
              </p>
            </div>

            <div className="bg-lime-400 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-2xl font-bold uppercase mb-3 text-black">PAGAMENTI</h3>
              <p className="text-black font-mono">
                Accetta pagamenti online. Sicuro. Veloce. Senza problemi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - BRUTALIST */}
      <section className="py-20 bg-black text-white border-b-8 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold uppercase mb-12 border-b-4 border-yellow-400 pb-4 inline-block">
            COME FUNZIONA
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-black border-4 border-yellow-400 p-8">
              <div className="text-6xl font-bold text-yellow-400 mb-4">01</div>
              <h3 className="text-2xl font-bold uppercase mb-3">SCEGLI LE DATE</h3>
              <p className="font-mono">
                Seleziona il periodo. Visualizza disponibilità. Semplice.
              </p>
            </div>

            <div className="bg-white text-black border-4 border-yellow-400 p-8">
              <div className="text-6xl font-bold text-yellow-400 mb-4">02</div>
              <h3 className="text-2xl font-bold uppercase mb-3">SCEGLI POSIZIONE</h3>
              <p className="font-mono">
                Mappa interattiva. Prima fila o ultima. Tu decidi.
              </p>
            </div>

            <div className="bg-white text-black border-4 border-yellow-400 p-8">
              <div className="text-6xl font-bold text-yellow-400 mb-4">03</div>
              <h3 className="text-2xl font-bold uppercase mb-3">PAGA E VAI</h3>
              <p className="font-mono">
                Conferma. Paga. Ricevi email. Presentati in spiaggia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - BRUTALIST */}
      <section className="py-20 bg-red-500 border-b-8 border-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold uppercase text-white mb-6" style={{textShadow: '4px 4px 0px black'}}>
            INIZIA ADESSO
          </h2>
          <p className="text-xl mb-10 text-white font-bold uppercase">
            Centinaia di stabilimenti. Un unico sistema. Il tuo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-white text-black border-4 border-black font-bold uppercase text-lg hover:bg-yellow-400 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              REGISTRA STABILIMENTO
            </a>
            <a
              href="/prenota"
              className="px-8 py-4 bg-black text-white border-4 border-white font-bold uppercase text-lg hover:bg-yellow-400 hover:text-black hover:border-black transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              PRENOTA ORA
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;