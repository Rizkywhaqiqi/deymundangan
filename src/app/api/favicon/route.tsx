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

    // Create smaller SVG for favicon (64x64)
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
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
        <rect width="64" height="64" fill="url(#bg)"/>
        
        <!-- Border -->
        <rect x="4" y="4" width="56" height="56" fill="none" stroke="url(#gold)" stroke-width="1" opacity="0.4"/>
        
        <!-- Initials -->
        <text x="32" y="28" font-family="Georgia, serif" font-size="10" fill="#d4af37" text-anchor="middle" font-weight="500">
          ${invitation.groom_name.charAt(0)}&${invitation.bride_name.charAt(0)}
        </text>
        
        <!-- Ampersand -->
        <text x="32" y="42" font-family="Georgia, serif" font-size="14" fill="#d4af37" text-anchor="middle">&</text>
        
        <!-- Bottom decoration -->
        <line x1="32" y1="48" x2="32" y2="56" stroke="url(#gold)" stroke-width="0.5"/>
        <circle cx="32" cy="58" r="1" fill="#d4af37"/>
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