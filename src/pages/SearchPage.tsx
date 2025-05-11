import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { products } from '../data/products';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 300});

  
  const categories = [...new Set(products.map(product => product.category))];
  const colors = [...new Set(products.flatMap(product => product.colors))];
  const sizes = [...new Set(products.flatMap(product => product.sizes))];

  
  useEffect(() => {
    let results = [...products];

    
    if (searchQuery) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    if (selectedCategories.length > 0) {
      results = results.filter(product => selectedCategories.includes(product.category));
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      results = results.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      results = results.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Apply price range filter
    results = results.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setSearchResults(results);
  }, [searchQuery, selectedCategories, selectedColors, selectedSizes, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const newUrl = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
    window.history.pushState({}, '', `/search${newUrl}`);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange({min: 0, max: 300});
  };

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Products</h1>

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex mb-6">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-burgundy-600"
            />
            <button
              type="submit"
              className="bg-burgundy-600 text-white p-3 px-6 rounded-r-md hover:bg-burgundy-700 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Filter toggle for mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center text-gray-700 font-medium"
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-burgundy-600 hover:text-burgundy-800"
                >
                  Clear All
                </button>
              </div>

              {/* Category filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">${priceRange.min}</span>
                  <span className="text-sm text-gray-600">${priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({...prev, max: parseInt(e.target.value)}))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Color filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        selectedColors.includes(color)
                          ? 'border-burgundy-600 bg-burgundy-50 text-burgundy-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      } transition-colors`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 border rounded-md min-w-[40px] text-sm ${
                        selectedSizes.includes(size)
                          ? 'border-burgundy-600 bg-burgundy-50 text-burgundy-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      } transition-colors`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active filters */}
              {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0) && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <div key={`cat-${category}`} className="flex items-center bg-burgundy-50 text-burgundy-700 px-2 py-1 rounded-md text-sm">
                        <span className="capitalize">{category}</span>
                        <button onClick={() => toggleCategory(category)} className="ml-1">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {selectedColors.map(color => (
                      <div key={`color-${color}`} className="flex items-center bg-burgundy-50 text-burgundy-700 px-2 py-1 rounded-md text-sm">
                        <span>{color}</span>
                        <button onClick={() => toggleColor(color)} className="ml-1">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {selectedSizes.map(size => (
                      <div key={`size-${size}`} className="flex items-center bg-burgundy-50 text-burgundy-700 px-2 py-1 rounded-md text-sm">
                        <span>{size}</span>
                        <button onClick={() => toggleSize(size)} className="ml-1">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search results */}
          <div className="md:w-3/4">
            <div className="mb-4">
              <p className="text-gray-600">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">No products found</h2>
                <p className="mb-6">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;