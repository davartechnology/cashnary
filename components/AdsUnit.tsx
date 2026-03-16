'use client'

export default function AdsUnit() {
  return (
    <div 
      id="frame" 
      style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}
    >
      <iframe 
        data-aa='2430703' 
        src='//acceptable.a-ads.com/2430703/?size=Adaptive'
        style={{ 
          border: 0, 
          padding: 0, 
          width: '70%', 
          height: 'auto', 
          overflow: 'hidden', 
          display: 'block', 
          margin: 'auto' 
        }}
        scrolling='no'
      />
    </div>
  )
}
