import { getInvitationBySlug } from '@/services/server-invitation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import InvitationPage from '@/components/layout/InvitationPage'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  try {
    const invitation = await getInvitationBySlug(slug)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://triaspaisalwedding.vercel.app'
    
    // Check if cover_image is a video (not suitable for OG image)
    const isVideo = invitation.cover_image && /\.(mp4|webm|ogg|mov)$/i.test(invitation.cover_image)
    const ogImage = (!invitation.cover_image || isVideo) ? `${baseUrl}/api/og?slug=${slug}` : invitation.cover_image

    return {
      title: `Wedding Invitation - ${invitation.groom_name} & ${invitation.bride_name}`,
      description: `Undangan Pernikahan ${invitation.groom_name} & ${invitation.bride_name} - ${new Date(invitation.wedding_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
      openGraph: {
        title: `${invitation.groom_name} & ${invitation.bride_name}`,
        description: `Undangan Pernikahan ${invitation.groom_name} & ${invitation.bride_name}`,
        type: 'website',
        url: `${baseUrl}/${slug}`,
        siteName: 'Wedding Invitation',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${invitation.groom_name} & ${invitation.bride_name} - Wedding Invitation`,
          },
        ],
        locale: 'id_ID',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${invitation.groom_name} & ${invitation.bride_name}`,
        description: `Undangan Pernikahan`,
        images: [ogImage],
      },
    }
  } catch {
    return {
      title: 'Undangan Pernikahan',
    }
  }
}

export default async function InvitationSlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const invitedGuestName = typeof resolvedSearchParams.to === 'string' ? decodeURIComponent(resolvedSearchParams.to) : undefined

  try {
    const invitation = await getInvitationBySlug(slug)

    const supabase = await createServerSupabaseClient()

    const [storiesResult, galleriesResult, giftsResult] = await Promise.all([
      supabase.from('stories').select('*').eq('invitation_id', invitation.id).order('order', { ascending: true }),
      supabase.from('galleries').select('*').eq('invitation_id', invitation.id).order('order', { ascending: true }),
      supabase.from('gifts').select('*').eq('invitation_id', invitation.id).eq('is_active', true),
    ])

    return (
      <InvitationPage
        invitation={invitation}
        stories={storiesResult.data || []}
        galleries={galleriesResult.data || []}
        gifts={giftsResult.data || []}
        invitedGuestName={invitedGuestName}
      />
    )
  } catch {
    notFound()
  }
}
