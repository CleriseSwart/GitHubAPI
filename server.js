const express = require('express');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(helmet());  // Enhance security 
app.use(express.json()); // parse JSON requests

// Endpoint to search for a GitHub user
app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const githubApiUrl = `https://api.github.com/users/${username}`;

    // Fetch user information from GitHub API
    const userData = await axios.get(githubApiUrl);
    const { login, avatar_url } = userData.data;

    // Fetch 5 most recent repos of the user
    const reposUrl = `https://api.github.com/users/${username}/repos?sort=created&per_page=5`;
    const reposData = await axios.get(reposUrl);

    // Extract relevant information from fetched repositories
    const recentRepos = reposData.data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
    }));

    // Fetch the 5 most recent commit messages for each repo
    const commitMessagesPromises = recentRepos.map(async (repo) => {
      const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=5`;
      const commitsData = await axios.get(commitsUrl);

      repo.commits = commitsData.data.map((commit) => ({
        message: commit.commit.message,
      }));

      return repo;
    });

    // Wait for all commit messages to be fetched
    const reposWithCommits = await Promise.all(commitMessagesPromises);

    const responseData = {
      username: login,
      profile_picture: avatar_url,
      recent_repos: reposWithCommits,
    };

    res.json(responseData);
  } catch (error) {
    // Handle errors, and return a 404 status code with an error message
    res.status(404).json({ message: 'User not found or an error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
