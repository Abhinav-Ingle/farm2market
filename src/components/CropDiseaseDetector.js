import React, { useState } from 'react';
import axios from 'axios';

const CropDiseaseDetector = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [diseaseInfo, setDiseaseInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    // Function to handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to upload file and call API
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image file.");
            return;
        }

        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append("image", selectedFile); // Add file to formData

        try {
            // Replace 'https://api.example.com/detect' with your actual API endpoint
            const response = await axios.post('https://crop.kindwise.com/api/v1/identification', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `zBrGaBxspEIQezPfcADTbnYG9pwvG8rdW54AMStZWqoR7J3984` // Replace with your actual API key
                }
            });

            // Set the response data to display disease information
            setDiseaseInfo(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while detecting the disease.");
        } finally {
            setLoading(false); // End loading
        }
    };

    // Render component UI
    return (
        <div>
            <h2>Crop Disease Detector</h2>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleUpload}>Upload and Detect Disease</button>
            {loading && <p>Processing image...</p>}
            {diseaseInfo && (
                <div>
                    <h3>Disease Information</h3>
                    <p><strong>Disease Name:</strong> {diseaseInfo.diseaseName}</p>
                    <p><strong>Description:</strong> {diseaseInfo.description}</p>
                    {/* Display additional information if available from the API response */}
                </div>
            )}
        </div>
    );
};

export default CropDiseaseDetector;
