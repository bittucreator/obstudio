export interface PortfolioItem {
  id: string;
  title: string;
  category: 'website' | 'product' | 'branding';
  imageUrl: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
}

export interface Client {
  id: string;
  name: string;
  logo?: string;
}
