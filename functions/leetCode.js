const axios = require("axios");
const {
  LEETCODE_SKILLS_GRAPHQL,
  LEETCODE_USERNAME,
  LEETCODE_SKILLS_QUERY,
} = require("../src/constants"); // Update the import path to match your file structure

const handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    try {
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
