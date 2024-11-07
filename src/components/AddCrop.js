// import React, { useState } from 'react';
// import './AddCrop.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS

// const AddCrop = () => {
//   const [formData, setFormData] = useState({
//     postType: 'sell', // Default to sell
//     category: 'Crops',
//     title: '',
//     description: '',
//     quantity: '',
//     quantityType: '20kg', // Default quantity type
//     price: '',
//     priceType: 'Per 20kg',
//     availableFrom: '',
//     mobileNo: '',
//     address: '',
//     state: '',
//     district: '',
//     subDistrict: '',
//     village: '',
//     image: null
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleAddCrop = async (e) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem('token');  // Get JWT token for authentication
  
//     try {
//       const response = await fetch('http://localhost:5000/api/crops/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,  // Pass the token in the headers
//         },
//         body: JSON.stringify({
//           title: cropTitle,
//           description: cropDescription,
//           quantity: cropQuantity,
//           price: cropPrice,
//           userId: user._id,  // Use logged in user's ID
//         }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         toast.success('Crop added successfully!', {
//           position: 'top-right',
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         // Additional actions after crop is added (e.g., clearing form)
//       } else {
//         toast.error(data.message || 'Failed to add crop', {
//           position: 'top-right',
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//     } catch (error) {
//       toast.error('Error occurred. Please try again.', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };
  

//   return (
//     <div className="add-crop-container">
//       <form onSubmit={handleSubmit} className="add-crop-form">
//         <h2>Post Your Crop for Sale</h2>
//         <p>Just fill the following details to get started!</p>

//         <div className="form-group">
//           <label htmlFor="postType">Select Your Post Type *</label>
//           <div className="post-type-options">
//             <label>
//               <input
//                 type="radio"
//                 name="postType"
//                 value="sell"
//                 checked={formData.postType === 'sell'}
//                 onChange={handleInputChange}
//               /> Post item for Sell
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="postType"
//                 value="rent"
//                 checked={formData.postType === 'rent'}
//                 onChange={handleInputChange}
//               /> Post item for Rent
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="postType"
//                 value="inquiry"
//                 checked={formData.postType === 'inquiry'}
//                 onChange={handleInputChange}
//               /> Post item for Inquiry
//             </label>
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="category">Category *</label>
//           <select name="category" id="category" value={formData.category} onChange={handleInputChange}>
//             <option value="Crops">Crops</option>
//             {/* Add more categories if needed */}
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="title">Title *</label>
//           <input
//             type="text"
//             name="title"
//             placeholder="Enter title here"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description *</label>
//           <textarea
//             name="description"
//             placeholder="Enter Description Here"
//             value={formData.description}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="quantity">Item Quantity *</label>
//             <input
//               type="text"
//               name="quantity"
//               placeholder="Enter item quantity here"
//               value={formData.quantity}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="quantityType">Quantity Type *</label>
//             <select name="quantityType" value={formData.quantityType} onChange={handleInputChange}>
//               <option value="20kg">20kg</option>
//               {/* Add more quantity types if needed */}
//             </select>
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="price">Expected Price *</label>
//             <input
//               type="text"
//               name="price"
//               placeholder="Enter expected Price here"
//               value={formData.price}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="priceType">Price Type *</label>
//             <select name="priceType" value={formData.priceType} onChange={handleInputChange}>
//               <option value="Per 20kg">Per 20kg</option>
//               {/* Add more price types if needed */}
//             </select>
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="availableFrom">Available From *</label>
//             <input
//               type="date"
//               name="availableFrom"
//               value={formData.availableFrom}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="mobileNo">Mobile No. *</label>
//             <div>
//               <span className="country-code">+91</span>
//               <input
//                 type="tel"
//                 name="mobileNo"
//                 placeholder="Enter Mobile Number"
//                 value={formData.mobileNo}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="address">Enter Address *</label>
//           <input
//             type="text"
//             name="address"
//             placeholder="Enter a Address"
//             value={formData.address}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="state">Select State *</label>
//             <select name="state" value={formData.state} onChange={handleInputChange}>
//               <option value="">--Select--</option>
//               {/* Add more states */}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="district">Select District *</label>
//             <select name="district" value={formData.district} onChange={handleInputChange}>
//               <option value="">--Select--</option>
//               {/* Add more districts */}
//             </select>
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="subDistrict">Select Sub District</label>
//             <input
//               type="text"
//               name="subDistrict"
//               value={formData.subDistrict}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="village">Select Village</label>
//             <input
//               type="text"
//               name="village"
//               value={formData.village}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Upload images *</label>
//           <input type="file" name="image" onChange={handleImageUpload} />
//         </div>

//         <button type="submit" className="submit-btn">Submit</button>
//       </form>

//       {/* Toast container to display toast messages */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddCrop;
import React, { useState } from 'react';
import './AddCrop.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS

const AddCrop = () => {
  const [formData, setFormData] = useState({
    postType: 'sell', // Default to sell
    category: 'Crops',
    title: '',
    description: '',
    quantity: '',
    quantityType: '20kg', // Default quantity type
    price: '',
    priceType: 'Per 20kg',
    availableFrom: '',
    mobileNo: '',
    address: '',
    state: '',
    district: '',
    subDistrict: '',
    village: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddCrop = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');  // Get JWT token for authentication
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage if required
  
    try {
      const response = await fetch('http://localhost:5000/api/crops/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Pass the token in the headers
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          quantity: formData.quantity,
          price: formData.price,
          userId: user._id,  // Use logged in user's ID
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Crop added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Additional actions after crop is added (e.g., clearing form)
      } else {
        toast.error(data.message || 'Failed to add crop', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('Error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  return (
    <div className="add-crop-container">
      <form onSubmit={handleAddCrop} className="add-crop-form">
        <h2>Post Your Crop for Sale</h2>
        <p>Just fill the following details to get started!</p>

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
            <option value="Crops">Crops</option>
            {/* Add more categories if needed */}
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
            <label htmlFor="quantity">Item Quantity *</label>
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
              <option value="20kg">20kg</option>
              {/* Add more quantity types if needed */}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Expected Price *</label>
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
              <option value="Per 20kg">Per 20kg</option>
              {/* Add more price types if needed */}
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
            placeholder="Enter a Address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="state">Select State *</label>
            <select name="state" value={formData.state} onChange={handleInputChange}>
              <option value="">--Select--</option>
              {/* Add more states */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district">Select District *</label>
            <select name="district" value={formData.district} onChange={handleInputChange}>
              <option value="">--Select--</option>
              {/* Add more districts */}
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
          <label htmlFor="image">Upload Image *</label>
          <input type="file" name="image" onChange={handleImageUpload} />
        </div>

        <button type="submit" className="submit-btn">Add Crop</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCrop;
