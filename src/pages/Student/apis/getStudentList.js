import axios from "axios";

export default () => axios
  .get(`https://lms-backend-new.herokuapp.com/api/students?filter=%7B%22include%22%3A%5B%22newUsers%22%5D%7D`);