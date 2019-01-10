import axios from "axios";
import env_path from "../../Env_path";

export default newUser =>
  axios.post(`${env_path}/NewUsers`, newUser);
