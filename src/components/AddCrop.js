import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Menu, Home, ListChecks, Info, LogOut, Plus, UserCircle2, Leaf } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import './AddCrop.css';

const AddCrop = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    postType: 'sell',
    category: 'Crops',
    title: '',
    description: '',
    quantity: '',
    quantityType: '20kg',
    price: '',
    priceType: 'Per 20kg',
    availableFrom: '',
    mobileNo: '',
    address: '',
    state: '',
    district: '',
    subDistrict: '',
    village: ''
  });


  const [imageType, setImageType] = useState('file'); 
  const [imageUrl, setImageUrl] = useState('');
  const ImageInputSection = () => (
    <div className="form-group">
      <label>Image Input Type</label>
      <div className="post-type-options">
        <label>
          <input
            type="radio"
            name="imageType"
            value="file"
            checked={imageType === 'file'}
            onChange={(e) => {
              setImageType(e.target.value);
              if (e.target.value === 'file') {
                setImageUrl('');
              } else {
                setImage(null);
              }
            }}
          /> Upload File
        </label>
        <label>
          <input
            type="radio"
            name="imageType"
            value="url"
            checked={imageType === 'url'}
            onChange={(e) => {
              setImageType(e.target.value);
              if (e.target.value === 'url') {
                setImage(null);
              } else {
                setImageUrl('');
              }
            }}
          /> Enter URL
        </label>
      </div>
    </div>
  );
  const [image, setImage] = useState(null);

 
  const allowedCategories = ['vegetable', 'fruit', 'grain', 'herb'];
  const allowedQuantityTypes = ['liter', 'kg', 'box'];
  const allowedPriceTypes = ['liter', 'kg', 'box'];
  const allowedStates = ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Tamil Nadu'];
  const allowedDistricts = ['Pune', 'Mumbai', 'Nagpur', 'Chennai'];
  const postTypes = ['sell', 'rent', 'inquiry'];
  const statusType = ['active', 'sold', 'expired'];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

 
  const handleAddCrop = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!token || !user) {
      toast.error('Please login first');
      navigate('/');
      return;
    }
  
    try {
      let requestBody;
      let headers = {
        'Authorization': `Bearer ${token}`
      };
  
      if (imageType === 'file' && image) {
        
        requestBody = new FormData();
        Object.keys(formData).forEach((key) => requestBody.append(key, formData[key]));
        requestBody.append('image', image);
      } else {
        
        headers['Content-Type'] = 'application/json';
        requestBody = JSON.stringify({
          ...formData,
          imageUrl: imageUrl || null
        });
      }
  
      const response = await fetch('http://localhost:5000/api/crops/add', {
        method: 'POST',
        headers,
        body: requestBody
      });
  
      if (response.status === 401 || response.status === 403) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/');
        return;
      }
  
      const result = await response.json();
      if (response.ok) {
        toast.success('Crop added successfully!', { duration: 2000 });
        setTimeout(() => {
          navigate('/my-listings');
        }, 2200);
      } else {
        toast.error(result.message || 'Failed to add crop');
      }
    } catch (error) {
      console.error('Error during crop addition:', error);
      toast.error('Error occurred. Please try again.');
    }
  };
  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
                <button
                  onClick={() => handleNavigation('/my-listings')}
                  className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <ListChecks className="h-5 w-5 mr-3" />
                  <span className="text-lg">My Listings</span>
                </button>
                <button
                  onClick={() => handleNavigation('/crop-info')}
                  className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Home className="h-5 w-5 mr-3" />
                  <span className="text-lg">Crop Information</span>
                </button>
                <button
                  onClick={() => handleNavigation('/about-us')}
                  className="w-full flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Info className="h-5 w-5 mr-3" />
                  <span className="text-lg">About Us</span>
                </button>
                <button
                  onClick={() => handleNavigation('/')}
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
        <div className="add-crop-container">
          <form onSubmit={handleAddCrop} className="add-crop-form">
            <h2>Post Your Crop for Sale</h2>
            <div className="form-group">
          <label htmlFor="postType">Select Your Post Type *</label>
          <div className="post-type-options">
            <label>
              <input
                type="radio"
                name="postType"
                value="sell"
                checked={formData.postType === 'sell'}
                onChange={handleInputChange}
              /> Post item for Sell
            </label>
            <label>
              <input
                type="radio"
                name="postType"
                value="rent"
                checked={formData.postType === 'rent'}
                onChange={handleInputChange}
              /> Post item for Rent
            </label>
            <label>
              <input
                type="radio"
                name="postType"
                value="inquiry"
                checked={formData.postType === 'inquiry'}
                onChange={handleInputChange}
              /> Post item for Inquiry
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select name="category" id="category" value={formData.category} onChange={handleInputChange}>
            {allowedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title here"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            name="description"
            placeholder="Enter Description Here"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Items in 1 *</label>
            <input
              type="text"
              name="quantity"
              placeholder="Enter item quantity here"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantityType">Quantity Type *</label>
            <select name="quantityType" value={formData.quantityType} onChange={handleInputChange}>
              {allowedQuantityTypes.map((qt) => (
                <option key={qt} value={qt}>
                  {qt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Expected Price per*</label>
            <input
              type="text"
              name="price"
              placeholder="Enter expected Price here"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="priceType">Price Type *</label>
            <select name="priceType" value={formData.priceType} onChange={handleInputChange}>
              {allowedPriceTypes.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="availableFrom">Available From *</label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No. *</label>
            <div>
              <span className="country-code">+91</span>
              <input
                type="tel"
                name="mobileNo"
                placeholder="Enter Mobile Number"
                value={formData.mobileNo}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Enter Address *</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="state">Select State *</label>
            <select name="state" value={formData.state} onChange={handleInputChange}>
              <option value="">--Select--</option>
              {allowedStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district">Select District *</label>
            <select name="district" value={formData.district} onChange={handleInputChange}>
              <option value="">--Select--</option>
              {allowedDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subDistrict">Select Sub District</label>
            <input
              type="text"
              name="subDistrict"
              value={formData.subDistrict}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="village">Select Village</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="form-group">
  <label htmlFor="image">Image</label>
  <ImageInputSection />
  {imageType === 'file' ? (
    <input type="file" name="image" onChange={handleImageUpload} />
  ) : (
    <input
      type="text"
      placeholder="Enter image URL"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
    />
  )}
</div>

            <button type="submit" className="submit-btn">Add Crop</button>
          </form>
          <ToastContainer toastOptions={{
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
        }}/>
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

export default AddCrop;
