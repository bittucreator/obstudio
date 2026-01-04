import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, imageUrl } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);

    const newItem = {
      id: Date.now().toString(),
      title,
      category,
      imageUrl,
      createdAt: new Date().toISOString().split('T')[0],
    };

    portfolioData.items.unshift(newItem);

    await fs.writeFile(dataFilePath, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json(newItem, { status: 201 });
  } catch {
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

    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);

    portfolioData.items = portfolioData.items.filter((item: { id: string }) => item.id !== id);

    await fs.writeFile(dataFilePath, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}
