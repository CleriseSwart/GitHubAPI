// src/App.js
import React, { useState } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import UserInfo from './components/UserInfo';
import RepoList from './components/RepoList';

function App() {
  // Initialize state variables for the user and their repositories
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  // Define a function to handle the search for a GitHub user
  const handleSearch = async (username) => {
    try {
      // Send a request to the server to fetch user data based on the entered username
      const response = await fetch(`/api/user/${username}`);
      if (response.ok) {
        // If the response is successful, parse the data and update the user and repository state
        const data = await response.json();
        setUser(data);
        setRepos(data.recent_repos);
      } else {
        // If the response is not successful, reset the user and repository state
        setUser(null);
        setRepos([]);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error(error);
    }
  };

  return (
    <div className="App">
      {/* Display a heading for the application */}
      <h1>Github User Search</h1>
      {/* Render the SearchBox component and pass the 'handleSearch' function as a prop */}
      <SearchBox onSearch={handleSearch} />
      {/* Render the UserInfo component if user data is available */}
      {user && <UserInfo user={user} />}
      {/* Render the RepoList component if there are repositories to display */}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
}

export default App;
