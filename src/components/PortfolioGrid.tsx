'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface Props {
  items: PortfolioItem[];
}

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'website', label: 'WEBSITE' },
  { id: 'product', label: 'PRODUCT' },
  { id: 'branding', label: 'BRANDING' },
];

export default function PortfolioGrid({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Filter out placeholder items (only show items with real uploaded images)
  const realItems = items.filter(item => !item.imageUrl.startsWith('/portfolio/placeholder'));

  const filteredItems = activeCategory === 'all' 
    ? realItems 
    : realItems.filter(item => item.category === activeCategory);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    
    if (selectedItem) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem, closeModal]);

  // Navigate between items
  const navigateItem = (direction: 'prev' | 'next') => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">TOP PICKS</span>
        </div>

        {/* Grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-4/3 bg-gray-100 rounded-lg overflow-hidden mb-3">
                {item.imageUrl.startsWith('/portfolio/placeholder') ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                    <span className="text-gray-400 text-sm">+ {item.title}</span>
                  </div>
                ) : (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <p className="text-sm text-gray-600">+ {item.title}</p>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No items in this category yet.
          </div>
        )}
      </div>

      {/* Modal/Popup */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          {/* Content */}
          <div 
            className="relative z-10 w-full max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <span className="text-sm">Close</span>
              <span className="ml-2 text-xs opacity-50">(ESC)</span>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={() => navigateItem('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => navigateItem('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              →
            </button>

            {/* Image */}
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {selectedItem.imageUrl.startsWith('/portfolio/placeholder') ? (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
                  <span className="text-gray-500 text-lg">{selectedItem.title}</span>
                </div>
              ) : (
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>

            {/* Info */}
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <h3 className="text-xl font-medium">{selectedItem.title}</h3>
                <p className="text-sm text-gray-400 capitalize">{selectedItem.category}</p>
              </div>
              <div className="text-sm text-gray-500">
                {filteredItems.findIndex(item => item.id === selectedItem.id) + 1} / {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
