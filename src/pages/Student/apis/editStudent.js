import axios from "axios";

export default (studentId, newStudent) =>
  axios.patch(
    `https://lms-backend-new.herokuapp.com:3001/api/students/${studentId}`,
    newStudent
  );
