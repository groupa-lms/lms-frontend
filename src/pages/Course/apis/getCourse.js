import axios from "axios";

export default (courseId) => axios
  .get(`http://lms-backend-new.herokuapp.com/api/courses/${courseId}?filter=%7B%22include%22%3A%5B%22teachers%22%5D%7D`);