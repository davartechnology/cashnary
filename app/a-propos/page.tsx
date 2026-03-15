import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata = {
  title: 'À propos - CASHNARY',
  description: 'Découvrez CASHNARY, le blog dédié aux stratégies pour gagner de l\'argent en ligne et aux outils IA qui transforment le business digital.'
}

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-gold/20 bg-black rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            À propos de <span className="text-gradient-gold">CASHNARY</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              CASHNARY est un blog dédié aux stratégies pour gagner de l'argent en ligne et aux outils IA qui transforment le business digital en 2026.
            </p>
            
            <p className="text-white/70 leading-relaxed mb-6">
              Nos articles sont publiés quotidiennement pour t'aider à construire ta liberté financière. 
              Que tu sois débutant ou entrepreneur confirmé, tu trouveras ici des conseils pratiques, 
              des stratégies testées et des outils concrets pour développer tes revenus en ligne.
            </p>
            
            <div className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-lg">
              <h2 className="text-xl font-semibold text-gold mb-3">Notre mission</h2>
              <p className="text-white/70">
                Démocratiser l'accès aux connaissances sur le business en ligne et l'intelligence artificielle 
                pour permettre à chacun de prendre le contrôle de ses revenus.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gold/10 rounded-lg">
                <h3 className="text-gold font-semibold mb-2">IA & Tech</h3>
                <p className="text-white/60 text-sm">
                  Les derniers outils d'intelligence artificielle pour automatiser et scaler ton business.
                </p>
              </div>
              <div className="p-4 border border-gold/10 rounded-lg">
                <h3 className="text-gold font-semibold mb-2">Business en ligne</h3>
                <p className="text-white/60 text-sm">
                  Stratégies concrètes pour générer des revenus sur internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
