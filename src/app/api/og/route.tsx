import { NextRequest, NextResponse } from 'next/server'
import { getInvitationBySlug } from '@/services/server-invitation'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  try {
    const invitation = await getInvitationBySlug(slug)

    // Create SVG image for OG
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f4e4bc;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bg)"/>
        
        <!-- Decorative border -->
        <rect x="40" y="40" width="1120" height="550" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.3"/>
        
        <!-- Top decoration -->
        <line x1="600" y1="100" x2="600" y2="140" stroke="url(#gold)" stroke-width="1"/>
        <circle cx="600" cy="150" r="3" fill="#d4af37"/>
        
        <!-- Main content -->
        <text x="600" y="220" font-family="Georgia, serif" font-size="18" fill="#d4af37" text-anchor="middle" letter-spacing="8">THE WEDDING OF</text>
        
        <!-- Groom Name -->
        <text x="600" y="300" font-family="Georgia, serif" font-size="52" fill="#ffffff" text-anchor="middle" font-weight="300">${invitation.groom_name}</text>
        
        <!-- Ampersand -->
        <text x="600" y="370" font-family="Georgia, serif" font-size="36" fill="#d4af37" text-anchor="middle">&</text>
        
        <!-- Bride Name -->
        <text x="600" y="440" font-family="Georgia, serif" font-size="52" fill="#ffffff" text-anchor="middle" font-weight="300">${invitation.bride_name}</text>
        
        <!-- Date -->
        <text x="600" y="510" font-family="Arial, sans-serif" font-size="16" fill="#ffffff" text-anchor="middle" letter-spacing="4" opacity="0.7">
          ${new Date(invitation.wedding_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </text>
        
        <!-- Bottom decoration -->
        <circle cx="600" cy="560" r="3" fill="#d4af37"/>
        <line x1="600" y1="570" x2="600" y2="610" stroke="url(#gold)" stroke-width="1"/>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
  }
}