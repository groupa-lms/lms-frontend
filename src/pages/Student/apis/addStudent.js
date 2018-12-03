import axios from "axios";

export default (newStudent) => axios
  .post('http://localhost:3001/api/students', newStudent);
