import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Signing in...', { duration: 3000 });
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        
        localStorage.setItem('token', data.token);
        console.log('Saved Token:', localStorage.getItem('token')); 

        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Saved User:', localStorage.getItem('user')); 

        
        toast.dismiss(loadingToast);
        toast.success('Successfully logged in!', {
          duration: 2000,
          position: 'top-center',
          icon: '🎉',
        });
        setTimeout(() => {
           navigate('/dashboard');
         }, 2000);
        
      } else {
        const data = await response.json();
        setError(data.message);
        
        toast.dismiss(loadingToast);
        toast.error(data.message || 'Login failed', {
          duration: 4000,
          position: 'top-right',
        });
      }
    } catch (err) {
      setError('An error occurred during login');
      
      toast.dismiss(loadingToast);
      toast.error('Connection error. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields', {
        duration: 3000,
        position: 'top-right',
      });
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email', {
        duration: 3000,
        position: 'top-right',
      });
      return false;
    }
    return true;
  };

  const handleSubmitWithValidation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white">
     
      <Toaster 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#22c55e',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
      
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmitWithValidation} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => {
                  if (!formData.email && document.activeElement !== document.querySelector('input[name="email"]')) {
                    toast.error('Email is required', {
                      duration: 2000,
                      position: 'top-right',
                    });
                  }
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => {
                  if (!formData.password && document.activeElement !== document.querySelector('input[name="password"]')) {
                    toast.error('Password is required', {
                      duration: 2000,
                      position: 'top-right',
                    });
                  }
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={() => {
                  toast.dismiss();
                }}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
