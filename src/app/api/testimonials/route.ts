import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);
    return NextResponse.json({ testimonials: portfolioData.testimonials || [] });
  } catch {
    return NextResponse.json({ error: 'Failed to load testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, author, role } = body;

    if (!content || !author || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);

    const newTestimonial = {
      id: Date.now().toString(),
      content,
      author,
      role,
    };

    portfolioData.testimonials.push(newTestimonial);

    await fs.writeFile(dataFilePath, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch {
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

    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);

    portfolioData.testimonials = portfolioData.testimonials.filter((t: { id: string }) => t.id !== id);

    await fs.writeFile(dataFilePath, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
