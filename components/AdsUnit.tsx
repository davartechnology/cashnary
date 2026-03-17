'use client'

export default function AdsUnit() {
  return (
    <div 
      id="frame" 
      style={{ width: '300px', margin: 'auto', zIndex: 99998, height: 'auto' }}
    >
      <iframe 
        data-aa='2430703' 
        src='//ad.a-ads.com/2430703/?size=300x250'
        style={{ 
          border: 0, 
          padding: 0, 
          width: '300px', 
          height: '250px', 
          overflow: 'hidden', 
          display: 'block', 
          margin: 'auto' 
        }}
      />
    </div>
  )
}
