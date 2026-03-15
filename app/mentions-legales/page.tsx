import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata = {
  title: 'Mentions légales - CASHNARY',
  description: 'Mentions légales du blog CASHNARY - Éditeur et hébergeur.'
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-gold/20 bg-black rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            <span className="text-gradient-gold">Mentions légales</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">1. Éditeur du site</h2>
              <div className="text-white/70 leading-relaxed space-y-2">
                <p><strong>Nom :</strong> CASHNARY</p>
                <p><strong>Statut :</strong> Blog personnel</p>
                <p><strong>Email :</strong> contact@cashnary.com</p>
                <p><strong>Responsable de la publication :</strong> CASHNARY</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">2. Hébergement</h2>
              <div className="text-white/70 leading-relaxed space-y-2">
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">https://vercel.com</a></p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">3. Propriété intellectuelle</h2>
              <p className="text-white/70 leading-relaxed">
                L'ensemble des contenus présents sur ce site (textes, images, graphiques, logos, vidéos, sons, logiciels, etc.) est protégé par le droit d'auteur et le droit de la propriété intellectuelle.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable de CASHNARY.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">4. Responsabilité</h2>
              <p className="text-white/70 leading-relaxed">
                Les informations fournies sur ce site le sont à titre purement informatif. CASHNARY s'efforce d'assurer l'exactitude des informations présentées sur ce site, mais ne peut garantir l'exactitude, l'exhaustivité ou l'actualité des informations.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                CASHNARY ne pourra être tenu responsable des erreurs ou omissions dans les informations publiées sur ce site, ni des dommages directs ou indirects résultant de l'utilisation de ces informations.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">5. Liens hypertextes</h2>
              <p className="text-white/70 leading-relaxed">
                Le site peut contenir des liens vers d'autres sites internet. CASHNARY n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">6. Publicité et liens affiliés</h2>
              <p className="text-white/70 leading-relaxed">
                Ce site affich des publicités (Google AdSense) et participe à des programmes d'affiliation (Amazon Associates, Systeme.io, etc.). CASHNARY peut recevoir une commission sur les achats effectués via les liens affiliés, sans frais supplémentaire pour l'utilisateur.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">7. Droit applicable</h2>
              <p className="text-white/70 leading-relaxed">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">8. Contact</h2>
              <p className="text-white/70 leading-relaxed">
                Pour toute question concernant ces mentions légales, contactez-nous à : contact@cashnary.com
              </p>
            </section>
            
            <p className="text-white/50 text-sm mt-8 pt-8 border-t border-gold/10">
              Dernière mise à jour : Mars 2026
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
