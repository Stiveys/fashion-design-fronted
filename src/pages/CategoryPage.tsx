import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';
import { Product } from '../types';
import { getProductsByCategory } from '../data/products';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high';

const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'newest':
      return sortedProducts.filter(p => p.isNew).concat(sortedProducts.filter(p => !p.isNew));
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'featured':
    default:
      return sortedProducts.filter(p => p.isFeatured).concat(sortedProducts.filter(p => !p.isFeatured));
  }
};

const CategoryPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [showFilters, setShowFilters] = useState(false);
  
  
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  
  useEffect(() => {
    const categoryProducts = getProductsByCategory(category);
    setProducts(categoryProducts);
    setFilteredProducts(categoryProducts);
  }, [category]);
  
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply sorting
    const sorted = sortProducts(filtered, sortBy);
    setFilteredProducts(sorted);
  }, [products, selectedColors, selectedSizes, priceRange, sortBy]);
  
  const toggleColorFilter = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const resetFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 300]);
    setSortBy('featured');
  };
  
  const hasActiveFilters = selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 300;
  
  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-burgundy-600">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium capitalize">{category}</li>
          </ol>
        </nav>
        
        <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">Filters</h3>
                  {hasActiveFilters && (
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-burgundy-600 hover:text-burgundy-800"
                    >
                      Reset All
                    </button>
                  )}
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">${priceRange[0]}</span>
                    <span className="text-sm text-gray-500">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Colors</h4>
                  <div className="space-y-2">
                    {allColors.map(color => (
                      <label key={color} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleColorFilter(color)}
                          className="rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500 h-4 w-4 mr-2"
                        />
                        <span className="text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Sizes */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSizeFilter(size)}
                        className={`px-3 py-1 border rounded-md text-sm ${
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
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center mb-4 sm:mb-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center text-gray-700 mr-4"
                >
                  <Filter size={18} className="mr-1" />
                  Filters
                </button>
                
                <p className="text-gray-500">
                  Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
                </p>
              </div>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <label htmlFor="sort" className="text-sm text-gray-700">Sort by:</label>
                <div className="relative flex-grow sm:flex-grow-0">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white fixed inset-0 z-40 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Filters</h3>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">${priceRange[0]}</span>
                      <span className="text-sm text-gray-500">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Colors */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Colors</h4>
                    <div className="space-y-2">
                      {allColors.map(color => (
                        <label key={color} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColorFilter(color)}
                            className="rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500 h-4 w-4 mr-2"
                          />
                          <span className="text-gray-700">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Sizes</h4>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleSizeFilter(size)}
                          className={`px-3 py-1 border rounded-md text-sm ${
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
                  
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => {
                        resetFilters();
                        setShowFilters(false);
                      }}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 py-2 px-4 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm text-gray-700">Active Filters:</span>
                  
                  {selectedColors.map(color => (
                    <button
                      key={`color-${color}`}
                      onClick={() => toggleColorFilter(color)}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-burgundy-50 text-burgundy-600"
                    >
                      {color}
                      <X size={14} className="ml-1" />
                    </button>
                  ))}
                  
                  {selectedSizes.map(size => (
                    <button
                      key={`size-${size}`}
                      onClick={() => toggleSizeFilter(size)}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-burgundy-50 text-burgundy-600"
                    >
                      Size: {size}
                      <X size={14} className="ml-1" />
                    </button>
                  ))}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 300) && (
                    <button
                      onClick={() => setPriceRange([0, 300])}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-burgundy-50 text-burgundy-600"
                    >
                      Price: ${priceRange[0]} - ${priceRange[1]}
                      <X size={14} className="ml-1" />
                    </button>
                  )}
                  
                  <button
                    onClick={resetFilters}
                    className="text-sm text-burgundy-600 hover:text-burgundy-800 ml-2"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
            
            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No products found matching your filters.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick View Modal */}
      <ProductQuickView 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
};

export default CategoryPage;