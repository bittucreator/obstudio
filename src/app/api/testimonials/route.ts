import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform to match expected format
    const transformedTestimonials = (testimonials || []).map(t => ({
      id: t.id,
      content: t.content,
      author: t.author,
      role: t.role,
    }));

    return NextResponse.json({ testimonials: transformedTestimonials });
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return NextResponse.json({ testimonials: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, author, role } = body;

    if (!content || !author || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          content,
          author,
          role,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    const newTestimonial = {
      id: data.id,
      content: data.content,
      author: data.author,
      role: data.role,
    };

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Failed to add testimonial:', error);
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
