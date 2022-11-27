const URLS = {
  // baseUrl: `https://votyserve.herokuapp.com`,
  baseUrl: `https://goldfish-app-66sp7.ondigitalocean.app`,
};

//THESE ARE THE AVAILABLE URLS
const getVoters = `${URLS.baseUrl}/voter`;
const getCandidates = `${URLS.baseUrl}/candidate`;
const getParticularVoter = `${URLS.baseUrl}/voter/8df491`;
const vote = `${URLS.baseUrl}/voter/8df491/9df492`;

module.exports = {
  URLS,
  getCandidates,
  getParticularVoter,
  getVoters,
  vote,
};
