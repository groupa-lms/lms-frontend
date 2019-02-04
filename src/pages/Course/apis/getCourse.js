import axios from "axios";
import env_path from "../../Env_path";

export default (courseId) => axios
  .get(`${env_path}/courses/${courseId}?filter=%7B%22include%22%3A%5B%22teachers%22%5D%7D`);