import axios from "axios";

export default (newCourse) => axios
  .post('http://lms-backend-new.herokuapp.com/api/courses', newCourse);