'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-gold/20 bg-black rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-gradient-gold">Contact</span>
          </h1>
          <p className="text-white/60 mb-8">
            Une question ? Un partenariat ? Écris-nous.
          </p>
          
          <div className="mb-8 p-4 bg-gold/5 border border-gold/20 rounded-lg">
            <p className="text-white/80">
              📧 <strong>Email :</strong> contact@cashnary.com
            </p>
          </div>
          
          <div className="space-y-4">
            <input 
              value={name} 
              onChange={e => setName(e.target.value)}
              placeholder="Ton nom" 
              className="w-full bg-black border border-gold/30 rounded px-4 py-3 text-white placeholder:text-white/40"
            />
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder="Ton email" 
              type="email"
              className="w-full bg-black border border-gold/30 rounded px-4 py-3 text-white placeholder:text-white/40"
            />
            <textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              placeholder="Ton message" 
              rows={5}
              className="w-full bg-black border border-gold/30 rounded px-4 py-3 text-white placeholder:text-white/40 resize-none"
            />
            <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold py-3 rounded-lg hover:from-yellow-400 hover:to-amber-500 transition">
              Envoyer
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
