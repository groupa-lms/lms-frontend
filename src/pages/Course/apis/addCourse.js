import axios from "axios";

export default (newCourse) => axios
  .post('http://localhost:3001/api/courses', newCourse);