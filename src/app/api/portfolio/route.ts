import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: items, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform to match expected format
    const transformedItems = (items || []).map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      imageUrl: item.image_url,
      createdAt: item.created_at,
    }));

    return NextResponse.json({ items: transformedItems });
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, imageUrl } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('portfolio')
      .insert([
        {
          title,
          category,
          image_url: imageUrl,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    const newItem = {
      id: data.id,
      title: data.title,
      category: data.category,
      imageUrl: data.image_url,
      createdAt: data.created_at,
    };

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Failed to add portfolio item:', error);
    return NextResponse.json({ error: 'Failed to add portfolio item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete portfolio item:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}
