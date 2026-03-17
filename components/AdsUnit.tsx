'use client'

export default function AdsUnit() {
  return (
    <div style={{ width: '100%', margin: '20px auto', textAlign: 'center' }}>
      
      {/* Adsterra 300x250 */}
      <div style={{ display: 'inline-block', margin: '10px auto' }}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '7a866bfbc5ac80c3641a26a5bef88abd',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
              };
            `
          }}
        />
        <script src="https://www.highperformanceformat.com/7a866bfbc5ac80c3641a26a5bef88abd/invoke.js" />
      </div>

    </div>
  )
}
