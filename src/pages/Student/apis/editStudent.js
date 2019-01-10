import axios from "axios";
import env_path from "../../Env_path";

export default (studentId, newStudent) =>
  axios.patch(
    `${env_path}/students/${studentId}`,
    newStudent
  );
