import axios from "axios";
import env_path from "../../Env_path";

export default newStudent =>
  axios
    .post(`${env_path}/students`, newStudent)
    .then(({ data }) => {
      return data;
    });
