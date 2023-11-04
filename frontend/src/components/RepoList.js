// src/components/RepoList.js
import React from 'react';

// Define a functional component called RepoList that takes 'repos' as a prop
const RepoList = ({ repos }) => {
  return (
    <div>
      <h2>Recent Repositories</h2>
      <ul>
        {repos.map((repo, index) => (
          <li key={index}>
            <h3>{repo.name}</h3>
            <p>Description: {repo.description}</p>
            <p>Created at: {repo.created_at}</p>
            <p>Last updated at: {repo.updated_at}</p>
            <h4>Recent Commits:</h4>
            <ul>
              {repo.commits.map((commit, commitIndex) => (
                <li key={commitIndex}>{commit.message}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
