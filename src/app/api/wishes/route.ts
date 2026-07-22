import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const invitationId = searchParams.get('invitation_id')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    if (!invitationId) {
      return NextResponse.json({ error: 'invitation_id required' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Ambil data wishes dengan pagination + hitung total
    const { data, error, count } = await supabase
      .from('wishes')
      .select('id, name, message, created_at', { count: 'exact' })
      .eq('invitation_id', invitationId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      data,
      total: count || 0,
      page,
      limit,
      hasMore: offset + limit < (count || 0),
    })
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
      .select('id, name, message, created_at')
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating wish:', error)
    return NextResponse.json({ error: 'Failed to create wish' }, { status: 500 })
  }
}
