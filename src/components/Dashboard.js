import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Menu, Home, ListChecks, Info, LogOut, Plus, UserCircle2, Leaf } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const menuItems = [
    { icon: ListChecks, label: 'My Listings', path: '/my-listings' },
    { icon: Home, label: 'Crop Information', path: '/crop-info' },
    { icon: Info, label: 'About Us', path: '/about-us' },
  ];

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
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-xl animate-in slide-in-from-left">
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
        <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-8">Welcome back, Farmer!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'My Listings',
              description: 'View and manage your crop listings for sale',
              icon: ListChecks,
              path: '/my-listings',
              stats: '12 Active Listings'
            },
            {
              title: 'Crop Information',
              description: 'Discover detailed information on various crops',
              icon: Home,
              path: '/crop-info',
              stats: '50+ Crop Varieties'
            },
            {
              title: 'About Us',
              description: 'Learn more about our mission and team',
              icon: Info,
              path: '/about-us',
              stats: 'Since 2023'
            }
          ].map((item) => (
            <div 
              key={item.path}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                      <item.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">{item.title}</h3>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{item.stats}</span>
                  <button 
                    onClick={() => handleNavigation(item.path)}
                    className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Outlet />
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

export default Dashboard;