import axios from "axios";
import env_path from "../../Env_path"

export default (accessToken, userId) => axios
  .get(
    `${env_path}/NewUsers/${userId}`, {
    params: {
      access_token: accessToken
    }
  });

  //`http://localhost:3001/api/NewUsers/${userId}`