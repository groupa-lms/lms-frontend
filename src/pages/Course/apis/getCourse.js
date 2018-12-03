import axios from "axios";

export default (courseId) => axios
  .get(`http://localhost:3001/api/courses/${courseId}`);