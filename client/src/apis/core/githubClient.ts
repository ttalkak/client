import axios from "axios";

const githubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer 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`,
  },
});

export default githubClient;
