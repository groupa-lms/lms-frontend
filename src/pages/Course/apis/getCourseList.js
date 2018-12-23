import axios from "axios";

export default () => axios
  .get(`http://lms-backend-new.herokuapp.com/api/courses?filter=%7B%22include%22%3A%5B%22teachers%22%5D%7D`);