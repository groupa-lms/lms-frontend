import axios from "axios";

export default (accessToken, userId) => axios
  .get(
    `http://lms-backend-new.herokuapp.com/api/NewUsers/${userId}`, {
    params: {
      access_token: accessToken
    }
  });

  //`http://localhost:3001/api/NewUsers/${userId}`