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
    return {
      title: `Wedding Invitation - ${invitation.groom_name} & ${invitation.bride_name}`,
      description: `Undangan Pernikahan ${invitation.groom_name} & ${invitation.bride_name} - ${new Date(invitation.wedding_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
      openGraph: {
        title: `${invitation.groom_name} & ${invitation.bride_name}`,
        description: `Undangan Pernikahan`,
        type: 'website',
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
