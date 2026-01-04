import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);
    return NextResponse.json({ clients: portfolioData.clients || [] });
  } catch {
    return NextResponse.json({ error: 'Failed to load clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, logoUrl } = body;

    if (!name) {
      return NextResponse.json({ error: 'Missing client name' }, { status: 400 });
    }

    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);

    const newClient = {
      id: Date.now().toString(),
      name,
      logoUrl: logoUrl || null,
    };

    portfolioData.clients.push(newClient);

    await fs.writeFile(dataFilePath, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json(newClient, { status: 201 });
  } catch {
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

    const data = await fs.readFile(dataFilePath, 'utf-8');
    const portfolioData = JSON.parse(data);

    portfolioData.clients = portfolioData.clients.filter((client: { id: string }) => client.id !== id);

    await fs.writeFile(dataFilePath, JSON.stringify(portfolioData, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
