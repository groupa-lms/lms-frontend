import axios from "axios";
import env_path from "../../Env_path";

export default (courseId, newCourse) => axios
  .patch(`${env_path}/courses/${courseId}`,newCourse);