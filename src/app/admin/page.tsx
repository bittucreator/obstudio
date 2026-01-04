'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'website' | 'product' | 'branding';
  imageUrl: string;
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
  logoUrl?: string | null;
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
}

type Tab = 'portfolio' | 'clients' | 'testimonials';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Portfolio form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'website' | 'product' | 'branding'>('website');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  // Client form state
  const [clientName, setClientName] = useState('');
  const [clientLogoFile, setClientLogoFile] = useState<File | null>(null);
  const [clientLogoPreview, setClientLogoPreview] = useState<string>('');

  // Testimonial form state
  const [testimonialContent, setTestimonialContent] = useState('');
  const [testimonialAuthor, setTestimonialAuthor] = useState('');
  const [testimonialRole, setTestimonialRole] = useState('');

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        setIsAuthenticated(true);
        fetchAll();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchAll();
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error(error);
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async function fetchAll() {
    setLoading(true);
    try {
      const [portfolioRes, clientsRes, testimonialsRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/clients'),
        fetch('/api/testimonials'),
      ]);
      
      const portfolioData = await portfolioRes.json();
      const clientsData = await clientsRes.json();
      const testimonialsData = await testimonialsRes.json();
      
      setItems(portfolioData.items || []);
      setClients(clientsData.clients || []);
      setTestimonials(testimonialsData.testimonials || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handlePortfolioSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile || !title) {
      setMessage('Please fill in all fields and select an image');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error('Failed to upload image');
      }

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          imageUrl: uploadData.imageUrl,
        }),
      });

      if (res.ok) {
        setMessage('Portfolio item added successfully!');
        setTitle('');
        setCategory('website');
        setSelectedFile(null);
        setPreview('');
        fetchAll();
      } else {
        throw new Error('Failed to add portfolio item');
      }
    } catch (error) {
      setMessage('Error: Failed to add portfolio item');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  async function handleClientSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName) {
      setMessage('Please enter a client name');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      let logoUrl = null;

      // Upload logo if selected
      if (clientLogoFile) {
        const formData = new FormData();
        formData.append('file', clientLogoFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          logoUrl = uploadData.imageUrl;
        }
      }

      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: clientName, logoUrl }),
      });

      if (res.ok) {
        setMessage('Client added successfully!');
        setClientName('');
        setClientLogoFile(null);
        setClientLogoPreview('');
        fetchAll();
      } else {
        throw new Error('Failed to add client');
      }
    } catch (error) {
      setMessage('Error: Failed to add client');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  function handleClientLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setClientLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleTestimonialSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!testimonialContent || !testimonialAuthor || !testimonialRole) {
      setMessage('Please fill in all fields');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: testimonialContent,
          author: testimonialAuthor,
          role: testimonialRole,
        }),
      });

      if (res.ok) {
        setMessage('Testimonial added successfully!');
        setTestimonialContent('');
        setTestimonialAuthor('');
        setTestimonialRole('');
        fetchAll();
      } else {
        throw new Error('Failed to add testimonial');
      }
    } catch (error) {
      setMessage('Error: Failed to add testimonial');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(type: 'portfolio' | 'clients' | 'testimonials', id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const endpoints = {
      portfolio: '/api/portfolio',
      clients: '/api/clients',
      testimonials: '/api/testimonials',
    };

    try {
      const res = await fetch(`${endpoints[type]}?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('Item deleted successfully');
        fetchAll();
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      setMessage('Error: Failed to delete item');
      console.error(error);
    }
  }

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <Link href="/" className="text-2xl font-semibold tracking-tight">
                OBSTUDIO.
              </Link>
              <p className="text-gray-500 text-sm mt-2">Admin Login</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loggingIn ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
                ← Back to site
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard (authenticated)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              OBSTUDIO.
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to site
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['portfolio', 'clients', 'testimonials'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-6">Add New Work</h2>
                
                <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as 'website' | 'product' | 'branding')}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="website">Website</option>
                      <option value="product">Product</option>
                      <option value="branding">Branding</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      {preview ? (
                        <div className="relative">
                          <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                          <button
                            type="button"
                            onClick={() => { setSelectedFile(null); setPreview(''); }}
                            className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <div className="py-8">
                            <p className="text-gray-500 text-sm">Click to upload image</p>
                            <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 10MB</p>
                          </div>
                          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Add to Portfolio'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-6">Portfolio Items ({items.length})</h2>
              {loading ? (
                <div className="text-center py-12 text-gray-500">Loading...</div>
              ) : items.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
                  No portfolio items yet.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                      <div className="relative aspect-4/3 bg-gray-100">
                        {item.imageUrl.startsWith('/portfolio/placeholder') ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                            <span className="text-gray-400 text-sm">{item.title}</span>
                          </div>
                        ) : (
                          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                        )}
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                        </div>
                        <button
                          onClick={() => handleDelete('portfolio', item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-6">Add New Client</h2>
                
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (PNG, SVG)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      {clientLogoPreview ? (
                        <div className="relative">
                          <img src={clientLogoPreview} alt="Logo Preview" className="max-h-24 mx-auto" />
                          <button
                            type="button"
                            onClick={() => { setClientLogoFile(null); setClientLogoPreview(''); }}
                            className="absolute top-0 right-0 w-6 h-6 bg-black text-white rounded-full text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <div className="py-4">
                            <p className="text-gray-500 text-sm">Click to upload logo</p>
                            <p className="text-gray-400 text-xs mt-1">PNG, SVG (optional)</p>
                          </div>
                          <input type="file" accept="image/png,image/svg+xml" onChange={handleClientLogoChange} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Adding...' : 'Add Client'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-6">Clients ({clients.length})</h2>
              {loading ? (
                <div className="text-center py-12 text-gray-500">Loading...</div>
              ) : clients.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
                  No clients yet.
                </div>
              ) : (
                <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {clients.map((client) => (
                    <div key={client.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 group text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2 overflow-hidden">
                        {client.logoUrl ? (
                          <img src={client.logoUrl} alt={client.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">
                            {client.name.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium">{client.name}</p>
                      <button
                        onClick={() => handleDelete('clients', client.id)}
                        className="text-red-500 hover:text-red-700 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-6">Add Testimonial</h2>
                
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      value={testimonialContent}
                      onChange={(e) => setTestimonialContent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      rows={4}
                      placeholder="What did they say about you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <input
                      type="text"
                      value={testimonialAuthor}
                      onChange={(e) => setTestimonialAuthor(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={testimonialRole}
                      onChange={(e) => setTestimonialRole(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="CEO of Company"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Adding...' : 'Add Testimonial'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-6">Testimonials ({testimonials.length})</h2>
              {loading ? (
                <div className="text-center py-12 text-gray-500">Loading...</div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
                  No testimonials yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 group">
                      <p className="text-gray-700 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          - {testimonial.author} {'//'} {testimonial.role}
                        </p>
                        <button
                          onClick={() => handleDelete('testimonials', testimonial.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
