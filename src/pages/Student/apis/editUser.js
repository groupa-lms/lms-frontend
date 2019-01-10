import axios from "axios";
import env_path from "../../Env_path";

export default (userId, newUser) => axios
  .patch(`${env_path}/NewUsers/${userId}`,newUser);