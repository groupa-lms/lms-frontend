import axios from "axios";

export default (teacherId) => axios
  .get(`http://localhost:3001/api/teachers/${teacherId}`);