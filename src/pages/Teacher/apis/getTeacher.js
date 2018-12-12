import axios from "axios";

export default (teacherId) => axios
  .get(`http://localhost:3001/api/teachers/${teacherId}?filter=%7B%22include%22%3A%5B%22newUsers%22%5D%7D`)
  .then(({ data })=>{
    return data;
});