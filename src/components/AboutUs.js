import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Sprout, Users, Shield, TrendingUp, CheckCircle, Menu, Home, ListChecks, Info, LogOut, Plus, UserCircle2, Leaf } from 'lucide-react';

const AboutUs = () => {
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

  const features = [
    {
      icon: Users,
      title: "Easy Profile Management",
      description: "Simple account creation and intuitive profile management for farmers and merchants"
    },
    {
      icon: CheckCircle,
      title: "Quality Verification",
      description: "Advanced AI-powered quality checking system for crop verification"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Safe and quick payment gateway ensuring protected transactions"
    },
    {
      icon: TrendingUp,
      title: "Market Access",
      description: "Direct connection to merchants and local markets for better prices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Sprout className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Welcome to Farm2Market
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering farmers with direct access to markets through innovative technology
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We aim to revolutionize agricultural commerce by eliminating middlemen and enabling 
              direct farmer-to-buyer transactions. Our platform ensures fair pricing, quality 
              assurance, and builds a sustainable future for agriculture.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Farm2Market?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <feature.icon className="w-12 h-12 mb-4 text-green-600" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-green-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Us Today!</h2>
          <p className="text-white font-bold  mb-8">
            Take control of your agricultural business and be part of building a 
            sustainable future for farming.
          </p>
          <button onClick={() => handleNavigation('/add')} className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold 
            hover:bg-green-50 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>

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
      <Outlet />
    </div>
  );
};

export default AboutUs;