import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata = {
  title: 'Politique de confidentialité - CASHNARY',
  description: 'Politique de confidentialité de CASHNARY - Comment nous collectons et protégeons vos données.'
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-gold/20 bg-black rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Politique de <span className="text-gradient-gold">confidentialité</span>
          </h1>
          
          <div className="prose prose-invert prose-gold max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">1. Introduction</h2>
              <p className="text-white/70 leading-relaxed">
                La présente politique de confidentialité décrit comment CASHNARY collecte, utilise et protège vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation française en vigueur.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">2. Responsable du traitement</h2>
              <p className="text-white/70 leading-relaxed">
                Le responsable du traitement des données est :<br />
                <strong>CASHNARY</strong><br />
                Email : contact@cashnary.com
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">3. Données collectées</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong>Données fournies volontairement :</strong> nom, email (via le formulaire de contact)</li>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées (via cookies analytiques)</li>
                <li><strong>Données cookies :</strong> préférences utilisateur, statistiques de visite</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">4. Finalités du traitement</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Répondre à vos demandes via le formulaire de contact</li>
                <li>Améliorer notre site et l'expérience utilisateur</li>
                <li>Analyser les statistiques de visite</li>
                <li>Afficher des publicités personnalisées (Google AdSense)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">5. Cookies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Notre site utilise des cookies :
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> Google Analytics pour statistiques</li>
                <li><strong>Cookies publicitaires :</strong> Google AdSense pour les publicités</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Vous pouvez refuser les cookies en configurant votre navigateur.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">6. Google AdSense</h2>
              <p className="text-white/70 leading-relaxed">
                Nous utilisons Google AdSense pour afficher des publicités. Google utilise des cookies pour diffuser des annonces personnalisées. Vous pouvez désactiver la personnalisation des annonces via les <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">paramètres Google Ads</a>.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">7. Liens affiliés</h2>
              <p className="text-white/70 leading-relaxed">
                CASHNARY participe au programme Amazon Associates et à d'autres programmes d'affiliation. Nous recevons une commission sur les achats effectués via nos liens affiliés, sans frais supplémentaires pour vous.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">8. Conservation des données</h2>
              <p className="text-white/70 leading-relaxed">
                Les données collectées via le formulaire de contact sont conservées pendant 3 ans maximum. Les données analytiques sont conservées pendant 14 mois.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">9. Vos droits (RGPD)</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger vos données</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à : contact@cashnary.com
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">10. Sécurité</h2>
              <p className="text-white/70 leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gold mb-4">11. Contact</h2>
              <p className="text-white/70 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité, contactez-nous à : contact@cashnary.com
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
