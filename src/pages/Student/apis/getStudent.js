import axios from "axios";

export default (studentId) => axios
  .get(`http://localhost:3001/api/students/${studentId}`);