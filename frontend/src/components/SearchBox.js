// src/components/SearchBox.js
import React, { useState } from 'react';

// Define a functional component called SearchBox
const SearchBox = ({ onSearch }) => {
  // Initialize a state variable 'username' using React's 'useState' hook
  const [username, setUsername] = useState('');

  // Define a function to handle the search button click
  const handleSearch = () => {
    // Call the 'onSearch' prop function and pass the 'username' as an argument
    onSearch(username);
  };

  return (
    <div>
      {/* Input field for entering a GitHub username */}
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        // Update the 'username' state when the input value changes
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Button to trigger the search */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;
