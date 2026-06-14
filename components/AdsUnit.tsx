'use client'

import { useEffect, useState } from 'react'

export default function AdsUnit() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <div style={{ width: '100%', margin: '20px auto', position: 'relative', zIndex: 99998 }}>
      {isMobile ? (
        // Mobile
        <iframe 
          data-aa='2444075' 
          src='//acceptable.a-ads.com/2444075/?size=Adaptive'
          style={{ border: 0, padding: 0, width: '70%', height: 'auto', overflow: 'hidden', display: 'block', margin: 'auto' }}
        />
      ) : (
        // Desktop
        <iframe 
          data-aa='2444072' 
          src='//acceptable.a-ads.com/2444072/?size=Adaptive'
          style={{ border: 0, padding: 0, width: '70%', height: 'auto', overflow: 'hidden', display: 'block', margin: 'auto' }}
        />
      )}
    </div>
  )
}
