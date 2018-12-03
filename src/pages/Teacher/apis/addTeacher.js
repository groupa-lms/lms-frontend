import axios from "axios";

export default (newTeacher) => axios
  .post('http://localhost:3001/api/teachers', newTeacher);
