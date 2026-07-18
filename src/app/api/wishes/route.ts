import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const invitationId = searchParams.get('invitation_id')

    if (!invitationId) {
      return NextResponse.json({ error: 'invitation_id required' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .eq('invitation_id', invitationId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching wishes:', error)
    return NextResponse.json({ error: 'Failed to fetch wishes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { invitation_id, name, message } = body

    if (!invitation_id || !name || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('wishes')
      .insert({
        invitation_id,
        name,
        message,
        is_approved: true, // Auto-approve for now
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating wish:', error)
    return NextResponse.json({ error: 'Failed to create wish' }, { status: 500 })
  }
}