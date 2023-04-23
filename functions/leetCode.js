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
const handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    const currentTime = new Date().getTime();

    // Check if the cache is still valid
    if (cache.timestamp && currentTime - cache.timestamp <= CACHE_DURATION_MS) {
      console.log("Fetching From Cache");
      return {
        statusCode: 200,
        body: JSON.stringify(cache.data),
      };
    }
    try {
      console.log("Fetching From LeetCode.");
      const response = await axios.post(LEETCODE_SKILLS_GRAPHQL, {
        query: LEETCODE_SKILLS_QUERY,
        variables: { username: LEETCODE_USERNAME },
      });

      if (
        response.data &&
        response.data.data &&
        response.data.data.matchedUser &&
        response.data.data.matchedUser.tagProblemCounts
      ) {
        const skills = response.data.data.matchedUser.tagProblemCounts;
        cache = {
          timestamp: currentTime,
          data: skills,
        };
        return {
          statusCode: 200,
          body: JSON.stringify(skills),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Skills data not found" }),
        };
      }
    } catch (error) {
      console.error("Error fetching LeetCode skill data:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error fetching LeetCode skill data" }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed. Use GET request." }),
    };
  }
};

exports.handler = handler;
