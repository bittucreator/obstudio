-- Seed Data for OB Studio
-- Run this in the Supabase SQL Editor AFTER running schema.sql

-- Portfolio Items (excluding placeholder items)
INSERT INTO portfolio (title, category, image_url, created_at) VALUES
('Ficos', 'product', '/uploads/1767524356320-8.png', '2026-01-04'),
('Ficos', 'product', '/uploads/1767524349635-7.png', '2026-01-04'),
('Ficos', 'product', '/uploads/1767524345092-6.png', '2026-01-04'),
('Ficos', 'product', '/uploads/1767524339871-5.png', '2026-01-04'),
('Corvus', 'product', '/uploads/1767524233578-04.png', '2026-01-04'),
('Corvus', 'product', '/uploads/1767524227834-03.png', '2026-01-04'),
('Corvus', 'product', '/uploads/1767524222038-02.png', '2026-01-04'),
('Corvus', 'product', '/uploads/1767524209827-01.png', '2026-01-04'),
('Diagno', 'product', '/uploads/1767524192172-13.png', '2026-01-04'),
('Diagno', 'product', '/uploads/1767524187007-12.png', '2026-01-04'),
('Diagno', 'product', '/uploads/1767524181591-11.png', '2026-01-04'),
('Diagno', 'product', '/uploads/1767524174004-10.png', '2026-01-04'),
('Diagnosis', 'product', '/uploads/1767524063330-02.png', '2026-01-04'),
('Diagnosis', 'product', '/uploads/1767524057825-01.png', '2026-01-04'),
('Strell', 'website', '/uploads/1767523402262-04.png', '2026-01-04'),
('Strell', 'website', '/uploads/1767523398556-03.png', '2026-01-04'),
('Strell', 'website', '/uploads/1767523394072-02.png', '2026-01-04'),
('Strell', 'website', '/uploads/1767523390067-01.png', '2026-01-04'),
('Lumi', 'website', '/uploads/1767522715117-8.png', '2026-01-04'),
('Lumi', 'website', '/uploads/1767522710082-7.png', '2026-01-04'),
('Lumi', 'website', '/uploads/1767522705475-6.png', '2026-01-04'),
('Lumi', 'website', '/uploads/1767522700892-5.png', '2026-01-04'),
('StalCrew', 'website', '/uploads/1767522600153-12.png', '2026-01-04'),
('StalCrew', 'website', '/uploads/1767522595625-11.png', '2026-01-04'),
('StalCrew', 'website', '/uploads/1767522591091-10.png', '2026-01-04'),
('StalCrew', 'website', '/uploads/1767522585048-9.png', '2026-01-04'),
('Polyfin', 'website', '/uploads/1767499173879-04.png', '2026-01-04'),
('Polyfin', 'website', '/uploads/1767499164413-03.png', '2026-01-04'),
('Polyfin', 'website', '/uploads/1767498726168-02.png', '2026-01-04'),
('Polyfin', 'website', '/uploads/1767497773790-01.png', '2026-01-04');

-- Clients
INSERT INTO clients (name, logo_url) VALUES
('Strell', '/uploads/1767523490595-shell.svg'),
('StalCrew', '/uploads/1767523500315-21.svg'),
('Lumi', '/uploads/1767523539006-22.svg'),
('Unosend', '/uploads/1767523577400-34.svg'),
('Polyfin', '/uploads/1767523626116-32.svg'),
('Writine', '/uploads/1767523677018-24.svg'),
('Ficos', '/uploads/1767524324699-Logo-Container.svg');

-- Testimonials
INSERT INTO testimonials (content, author, role) VALUES
('Working with OB Studio has been an incredible experience. They deliver exceptional quality and creative work, even with minimal direction, always maintaining strong visual style and brand consistency.', 'Alex Chen', 'Founder of TechFlow'),
('OB Studio transformed our brand from a rough idea into something we''re truly proud of. Their attention to detail and understanding of our vision was remarkable. The website they built has significantly improved our conversion rates.', 'Sarah Mitchell', 'CEO of Lumi'),
('Fast, professional, and incredibly talented. They understood our startup''s needs and delivered a website that perfectly captures our brand essence. Highly recommend for any founder looking for quality design.', 'James Rodriguez', 'Co-founder of StalCrew'),
('The team at OB Studio doesn''t just design—they strategize. They helped us rethink our entire user experience and the results speak for themselves. Our user engagement increased by 40% after the redesign.', 'Emily Watson', 'Product Lead at Polyfin'),
('I''ve worked with many design agencies, but OB Studio stands out. Their communication is crystal clear, deadlines are always met, and the quality exceeds expectations every single time.', 'David Kim', 'Founder of NexaLabs'),
('From branding to website to product design—OB Studio handled everything seamlessly. They''re not just designers, they''re partners who genuinely care about your success.', 'Maria Santos', 'CEO of Bloom Health');
