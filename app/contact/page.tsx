'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useState } from 'react'

export const metadata = {
  title: 'Contact - CASHNARY',
  description: 'Contactez CASHNARY pour toute question ou partenariat.'
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Merci pour votre message ! Nous vous répondrons sous 24h.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-gold/20 bg-black rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <span className="text-gradient-gold">Contact</span>
          </h1>
          
          <p className="text-white/70 mb-8">
            Une question, une suggestion ou une opportunité de partenariat ? 
            N'hésite pas à nous contacter !
          </p>
          
          <div className="mb-8 p-4 bg-gold/5 border border-gold/20 rounded-lg">
            <p className="text-white/80">
              📧 <strong>Email :</strong> contact@cashnary.com
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-gold/20 rounded-lg text-white focus:outline-none focus:border-gold"
                placeholder="Votre nom"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-gold/20 rounded-lg text-white focus:outline-none focus:border-gold"
                placeholder="votre@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-gold/20 rounded-lg text-white focus:outline-none focus:border-gold resize-none"
                placeholder="Votre message..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all"
            >
              Envoyer
            </button>
            
            {status && (
              <p className="text-green-400 text-center mt-4">{status}</p>
            )}
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
