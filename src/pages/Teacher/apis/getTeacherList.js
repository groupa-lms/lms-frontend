import axios from "axios";

export default () => axios
  .get(`http://lms-backend-new.herokuapp.com/api/teachers?filter=%7B%22include%22%3A%5B%22newUsers%22%5D%7D`)
  .then(({ data })=>{
    return data;
});