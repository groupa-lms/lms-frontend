import axios from "axios";

export default (accessToken, userId) => axios
  .get(`http://localhost:3001/api/NewUsers/${userId}`, {
    params: {
      access_token: accessToken
    }
  });