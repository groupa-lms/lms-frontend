import axios from "axios";

export default (studentId, newStudent) => axios
  .patch(`http://localhost:3001/api/students/${studentId}`,newStudent);