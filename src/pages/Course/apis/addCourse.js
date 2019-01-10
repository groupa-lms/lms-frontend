import axios from "axios";
import env_path from "../../Env_path";

export default (newCourse) => axios
  .post(`${env_path}/api/courses`, newCourse);