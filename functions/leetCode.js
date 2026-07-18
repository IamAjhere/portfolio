const axios = require("axios");

// Leetcode data for serverless
const LEETCODE_SKILLS_GRAPHQL = "https://leetcode.com/graphql/";
const LEETCODE_USERNAME = "IamAjHere";
const LEETCODE_SKILLS_QUERY = `
  query skillStats($username: String!) {
    matchedUser(username: $username) {
      tagProblemCounts {
        advanced {
          tagName
          problemsSolved
        }
        intermediate {
          tagName
          problemsSolved
        }
        fundamental {
          tagName
          problemsSolved
        }
      }
    }
  }
`;
// Cache configuration
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
let cache = {
  timestamp: null,
  data: null,
};

const JSON_HEADERS = { "Content-Type": "application/json" };

/**
 * @param {{ httpMethod: string }} event
 */
const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: "Method not allowed. Use GET request." }),
    };
  }

  const currentTime = new Date().getTime();

  // Check if the cache is still valid
  if (cache.timestamp && currentTime - cache.timestamp <= CACHE_DURATION_MS) {
    console.log("Fetching From Cache");
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify(cache.data),
    };
  }

  try {
    console.log("Fetching From LeetCode.");
    const response = await axios.post(LEETCODE_SKILLS_GRAPHQL, {
      query: LEETCODE_SKILLS_QUERY,
      variables: { username: LEETCODE_USERNAME },
    });

    const skills = response.data?.data?.matchedUser?.tagProblemCounts;

    if (!skills) {
      return {
        statusCode: 404,
        headers: JSON_HEADERS,
        body: JSON.stringify({ error: "Skills data not found" }),
      };
    }

    cache = {
      timestamp: currentTime,
      data: skills,
    };
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify(skills),
    };
  } catch (error) {
    console.error("Error fetching LeetCode skill data:", error);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: "Error fetching LeetCode skill data" }),
    };
  }
};

exports.handler = handler;
