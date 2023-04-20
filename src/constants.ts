//Github
export const GITHUB_USER_API_URL = "https://api.github.com/users/IamAjHere";
export const STATIC_DATA_RAW =
  "https://gist.githubusercontent.com/IamAjhere/2b4803a762983f5e4eda002e92b59682/raw";

//Leetcode data for serverless
export const LEETCODE_SKILLS_GRAPHQL = "https://leetcode.com/graphql/";
export const LEETCODE_USERNAME = "IamAjHere";
export const LEETCODE_SKILLS_QUERY = `
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
export const YOUR_NETLIFY_FUNCTION_URL = "/.netlify/functions/leetCode";
