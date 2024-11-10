import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Home, 
  ListChecks, 
  Info, 
  LogOut, 
  Plus, 
  UserCircle2, 
  Leaf,
  Pencil,
  Trash2,
  Filter,
  Search,
  ArrowUpDown,
  AlertCircle
} from 'lucide-react';


const MyListings = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setError(null);
      const response = await fetch('http://localhost:5000/api/crops', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Failed to load listings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const handleDelete = async (cropId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/crops/${cropId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }

      // Refresh listings after successful deletion
      fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      setError('Failed to delete listing. Please try again.');
    }
  };

  const sortListings = (listings) => {
    return [...listings].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'price') {
        return sortOrder === 'desc' 
          ? b.price - a.price
          : a.price - b.price;
      }
      return 0;
    });
  };

  const filterListings = (listings) => {
    return listings.filter(listing => {
      const matchesSearch = 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        filterCategory === 'all' || listing.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const menuItems = [
    { icon: ListChecks, label: 'My Listings', path: '/my-listings' },
    { icon: Home, label: 'Crop Information', path: '/crop-info' },
    { icon: Info, label: 'About Us', path: '/about-us' },
  ];

  const categories = ['all', 'vegetable', 'fruit', 'grain', 'herb'];

  const ListingCard = ({ listing }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
      <div className="aspect-video relative rounded-t-xl overflow-hidden">
        <img
          src={listing.imageUrl || '/api/placeholder/400/300'}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            listing.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
            listing.status === 'sold' ? 'bg-blue-100 text-blue-700' :
            'bg-amber-100 text-amber-700'
          }`}>
            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700`}>
            {listing.postType}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-slate-800">{listing.title}</h3>
          <span className="text-lg font-bold text-emerald-600">
            ₹{listing.price}/{listing.priceType}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-4">{listing.description}</p>
        <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
          <div>
            <span className="text-slate-500">Quantity: </span>
            <span className="font-medium">{listing.quantity} {listing.quantityType}</span>
          </div>
          <div>
            <span className="text-slate-500">Category: </span>
            <span className="font-medium capitalize">{listing.category}</span>
          </div>
          <div>
            <span className="text-slate-500">Location: </span>
            <span className="font-medium">{listing.district}, {listing.state}</span>
          </div>
          <div>
            <span className="text-slate-500">Available From: </span>
            <span className="font-medium">
              {new Date(listing.availableFrom).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/edit/${listing._id}`)}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(listing._id)}
            className="flex-1 px-4 py-2 border border-red-200 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const processedListings = sortListings(filterListings(listings));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-emerald-500 mr-2" />
              <h1 className="text-xl font-bold text-slate-800">Farm2Market</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer/Sidebar */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-xl">
            <div className="p-6">
              <div className="flex items-center mb-8">
                <Leaf className="h-8 w-8 text-emerald-500 mr-2" />
                <h2 className="text-2xl font-bold text-slate-800">Farm2Market</h2>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-lg">{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-4"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span className="text-lg">Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-24">
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">My Listings</h2>
            <button
              onClick={() => handleNavigation('/add')}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Crops
            </button>
          </div>

          {error && ( console.log(error)
          
          )}

          
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSortBy(sortBy === 'date' ? 'price' : 'date');
                  toggleSortOrder();
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg flex items-center text-slate-600 hover:bg-slate-50"
              >
                <ArrowUpDown className="h-5 w-5 mr-2" />
                Sort by {sortBy === 'date' ? 'Price' : 'Date'}
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-slate-600">Loading listings...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedListings.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-600">No listings found.</p>
                </div>
              ) : (
                processedListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))
              )}
            </div>
          )}
        </div>
      </main>

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full border border-slate-200 px-6">
        <div className="flex items-center space-x-8 py-3">
          <button
            onClick={() => handleNavigation('/dashboard')}
            className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/add')}
            className="flex flex-col items-center relative -mt-8"
          >
            <div className="p-4 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-xs mt-1 text-slate-600">Add</span>
          </button>

          <button
            onClick={() => handleNavigation('/profile')}
            className="flex flex-col items-center text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <UserCircle2 className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListings;