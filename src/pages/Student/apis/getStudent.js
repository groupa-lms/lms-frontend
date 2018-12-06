import axios from "axios";

export default (studentId) => axios
  .get(`http://localhost:3001/api/students/${studentId}`);
  //.get(`http://localhost:3001/api/students/${studentId}?filter=%7B%22include%22%3A%5B%22newUsers%22%5D%7D`);