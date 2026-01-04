-- Supabase Schema for OB Studio
-- Run this in the Supabase SQL Editor

-- Portfolio Items Table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on portfolio" ON portfolio
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on clients" ON clients
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on testimonials" ON testimonials
  FOR SELECT USING (true);

-- Create policies to allow authenticated insert/update/delete
CREATE POLICY "Allow authenticated insert on portfolio" ON portfolio
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on portfolio" ON portfolio
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on clients" ON clients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on clients" ON clients
  FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on testimonials" ON testimonials
  FOR DELETE USING (true);

-- Create Storage Bucket for Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Images Bucket
CREATE POLICY "Allow public read access on images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Allow public upload to images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public delete from images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images');
