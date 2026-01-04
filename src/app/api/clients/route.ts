import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform to match expected format
    const transformedClients = (clients || []).map(client => ({
      id: client.id,
      name: client.name,
      logoUrl: client.logo_url,
    }));

    return NextResponse.json({ clients: transformedClients });
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return NextResponse.json({ clients: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logoUrl } = body;

    if (!name) {
      return NextResponse.json({ error: 'Missing client name' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          name,
          logo_url: logoUrl || null,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    const newClient = {
      id: data.id,
      name: data.name,
      logoUrl: data.logo_url,
    };

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('Failed to add client:', error);
    return NextResponse.json({ error: 'Failed to add client' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing client ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete client:', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
