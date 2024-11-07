import React from 'react';

const MyListings = () => {
  return (
    <div>
      <h2>My Listings</h2>
      <p>
        Here is the list of all your crops currently listed for sale. You can edit or remove any listings as needed.
      </p>
      <ul>
        <li>Crop 1: 100kg - Price: $200</li>
        <li>Crop 2: 50kg - Price: $120</li>
        <li>Crop 3: 200kg - Price: $500</li>
      </ul>
    </div>
  );
};

export default MyListings;